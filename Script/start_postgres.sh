#!/bin/bash

# PostgreSQL 도커 컨테이너 실행 스크립트

# 환경 변수 설정
POSTGRES_USER=${POSTGRES_USER:-postgres}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-postgres}
POSTGRES_DB=${POSTGRES_DB:-postgres}
PORT=${PORT:-5432}

# 기존 컨테이너 삭제 (존재할 경우)
docker rm -f postgres || true

# 도커 컨테이너 실행
docker run --name postgres \
  -e POSTGRES_USER=$POSTGRES_USER \
  -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  -e POSTGRES_DB=$POSTGRES_DB \
  -p $PORT:5432 \
  -d postgres:latest

# 컨테이너 실행 상태 확인
docker ps -f name=postgres