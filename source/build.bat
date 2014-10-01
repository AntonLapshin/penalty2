node r.js -o app.build.js
del /s /q build\www\components\*.html
xcopy build\www ..\app /s /i /y
PAUSE