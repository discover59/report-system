# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


# Create your models here.
class ExcelFile(models.Model):
    date = models.DateField()
    excel_file = models.FileField(blank=True, upload_to='files')
