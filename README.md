# AWS를 활용한 모기 활동 지수 예보 및 알림 서비스

## 개요</br>
- **이름**: MozzyGaurd</br>
- **기간**: 2024.07.17-2024.07.26(10일)</br>
- **목표**:</br>
    - HA 클라우드 아키텍처 & 서버리스 설계/구현</br>
    - 사용자의 현재 위치와 선택 위치에서 모기 활동 데이터를 기반으로 모기 활동 지수 제공</br>
    - 모기 활동 예측 모델 구축 및 이메일 알림 서비스 제공</br>
- **기존 서비스와의 차이점**:<br>
 ![image](https://github.com/user-attachments/assets/0ef39718-380f-4c2d-9e66-4f259c4075fa)

---
## 개발 환경 및 기술 스택</br>
- **인프라 & OS**: AWS - EC2, S3, RDS, Lambda, SNS, Amazon Linux</br>
- **프론트엔드**: HTML5, CSS3, JavaScript</br>
- **백엔드**: Python, Flask</br>
- **DB**: MySQL</br>
- **ML**: scikit-learn</br>
- **개발 도구**: Git / Github, Notion</br>
---

## 머신 러닝 제작<br>
- **데이터 수집 및 전처리**: 모기 채집 데이터, 기후 데이터(평균 기온, 최고/최저 기온, 일교차, 강수량, 평균 습도), 서울시 모기지수 데이터
- **모델 테스트 및 분석**:
  1. 선형회귀분석 적용하여 지수 생성
  2. 생성한 지수와 서울시 지수의 분산편차 적용
- **학습 결과**: 최종 모기 지수의 결정계수는 **0.63**으로 서울시 모기지수의 결정계수보다 **0.03** 상승</br>
![image](https://github.com/user-attachments/assets/1421d698-2344-4e93-af82-5337f58d7d87)


## 시스템 구성도</br>
![image](https://github.com/user-attachments/assets/69908230-756b-4ca6-abfd-7551d0ca0b58)

</br></br>
## API 호출 순서</br>
![image](https://github.com/user-attachments/assets/68726eb5-9f9a-4025-9014-0b635f005ea6)
</br></br>

## 서비스 흐름도 </br>
![image](https://github.com/user-attachments/assets/9b6f4409-deb1-462d-95ba-f03467e05a32)
</br></br>

## 최종 결과물 </br>
![main](https://github.com/user-attachments/assets/d9b24b0e-31c4-4046-b307-99ccfe2e1969)
메인 화면</br>

![signup](https://github.com/user-attachments/assets/1b884a4b-5a85-4449-8590-022fec4dfcd6)
회원가입</br>

![service](https://github.com/user-attachments/assets/b1fcd759-3b62-424f-abe8-c8aff00dadd5)
사용자 실시간 위치에서의 모기 활동 지수 확인</br>

![select city](https://github.com/user-attachments/assets/29b22d9c-067a-4d2d-8f18-eb073b04e674)
특정 구에 대한 모기 활동 지수 확인</br>

![subscribe](https://github.com/user-attachments/assets/59100203-fd7a-4ba0-996c-ab5c9ea0df14)
구독 신청</br>

![image](https://github.com/user-attachments/assets/77769776-6e5a-4824-86f0-97868e2859fe)
구독 메일 확인</br>

---

### 프로젝트 후기</br>
**Keep**</br>
- 모빙 방식으로 진행하여 모든 팀원들이 프로젝트에 대한 공동 책임을 높임으로써 팀워크 향상</br>
- 매일 진행 상황을 보고하여 세부적인 일정을 조율함으로써 프로젝트 지연 없이 완료</br>
- 각자 공부한 내용을 노션으로 공유함으로써 원활한 협업 및 지식의 깊이 향상</br></br>
**Problem**</br>
- AWS에서 SSL 발급 대기 시간이 길어져 다른 SSL 인증서를 사용하였음</br>
- 서울에만 서비스 한정</br>
- 클라우드에 대한 경험과 지식 부족</br></br>
**Try**</br>
- 전국 날씨데이터를 가져와 서비스를 전국으로 확대</br>
- CloudWatch, WAF 등을 이용한 서비스 보안 강화</br>
- 메시지 알림 기능, 모든 개발자의 CI/CD 환경 구축</br>
