@echo off
set "GCLOUD_PATH="

if exist "%LOCALAPPDATA%\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd" (
    set "GCLOUD_PATH=%LOCALAPPDATA%\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
) else if exist "%ProgramFiles(x86)%\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd" (
    set "GCLOUD_PATH=%ProgramFiles(x86)%\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
) else if exist "%ProgramFiles%\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd" (
    set "GCLOUD_PATH=%ProgramFiles%\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
)

if "%GCLOUD_PATH%"=="" (
    echo gcloud.cmd not found.
    exit /b 1
)

echo Using gcloud at: %GCLOUD_PATH%
"%GCLOUD_PATH%" run deploy smart-stadium-ai --source . --project axiomatic-skill-337511 --region us-central1 --allow-unauthenticated
