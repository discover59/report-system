from django.conf.urls import url

from .views import DashboardPage, UploadFile, ParseFileOld, ExcelView, ScriptView


urlpatterns = [
    url(r'^main/', DashboardPage.as_view(), name='dashboard'),
    url(r'^upload/', UploadFile.as_view(), name='dashboard'),
    url(r'^api/parse_file', ParseFileOld.as_view(), name='upload_file'),
    url(r'^api/excel_data', ExcelView.as_view(), name='load_excel'),
    url(r'^api/run_script', ScriptView.as_view(), name='run_script'),
]
