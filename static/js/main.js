(function () {
    'use strict';

    angular
        .module('app')
        .controller('InitCtrl', InitCtrl);

    function InitCtrl($http, toastr) {
        var vm = this;
        var intervalID;

        vm.submitFile = undefined;
        vm.selectedDate = '';
        vm.submit = submit;
        vm.load = load;
        vm.selectSheet = selectSheet;

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
    }
})();