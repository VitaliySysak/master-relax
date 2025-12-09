:: Run db before start

@echo off
cd /d "%~dp0..\.."
call npx prisma generate
call npx prisma db push