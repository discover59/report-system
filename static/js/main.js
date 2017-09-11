(function () {
    'use strict';

    angular
        .module('app')
        .controller('InitCtrl', InitCtrl);

    function InitCtrl($http, toastr) {
        var vm = this;
        var intervalID;
        var scriptResult = {};

        vm.scriptList = [];
        vm.scriptNumber = undefined;
        vm.selectedResult = '';
        vm.selectedTab = 0;
        vm.submitFile = undefined;
        vm.selectedDate = '';
        vm.load = load;
        vm.runScript = runScript;
        vm.selectSheet = selectSheet;
        vm.submit = submit;
        vm.switchResult = switchResult;

        init();

        function init() {
            vm.selectedDate = new Date();
            load();
        }

        function load() {
            if (intervalID) {
                clearInterval(intervalID);
            }
            vm.tableData = {};
            vm.rawData = {};
            vm.sheetList = [];
            if (!vm.selectedDate) {
                toastr.warning('Please select date');
                return;
            }
            intervalID = setInterval(function () {
                $http.get('/app/api/excel_data/', {
                    params: {
                        date: vm.selectedDate.getTime()
                    }
                }).then(function (res) {
                    if (!res.data.state) {
                        toastr.warning('No data for selected date');
                        clearInterval(intervalID);
                    }
                    else {
                        vm.rawData = res.data.res;
                        vm.sheetList = Object.keys(res.data.res);
                        vm.tableData = vm.rawData[vm.selectedSheet];
                    }
                }, function (err) {
                    console.log(err);
                })
            }, 3000);
        }

        function runScript() {
            if (!vm.scriptNumber) {
                toastr.warning('Please input script number');
                return;
            }
            scriptResult[String(vm.scriptNumber)] = '';

            $http.post('/app/api/run_script/', {
                index: vm.scriptNumber
            }).then(function (res) {
                if (vm.scriptList.indexOf(vm.scriptNumber) === -1)
                    vm.scriptList.push(vm.scriptNumber);
                vm.selectedScript = vm.scriptNumber;
                scriptResult[String(vm.scriptNumber)] = res.data.res;
                vm.selectedResult = scriptResult[String(vm.selectedScript)];
            }, function (err) {
                toastr.error('Script failed to run!');
            });
        }

        function submit() {
            $http({
                url: '/app/api/parse_file/',
                method: "POST",
                data: vm.submitFile,
                headers: {'Content-Type': undefined}
            }).then(function (res) {
                vm.tableData = res.data;
            }, function (err) {
                console.log(err);
            });
            console.log(vm.submitFile);
        }

        function selectSheet(sheet_name) {
            if (!sheet_name) return;
            vm.tableData = vm.rawData[sheet_name];
        }

        function switchResult(index) {
            vm.selectedResult = scriptResult[String(index)];
        }
    }
})();