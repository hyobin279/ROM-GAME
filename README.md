# 몸을 움직여봐! — ROM 댄스 게임 🌟

5세 아동을 위한 관절가동범위(ROM) 향상 웹 게임입니다.  
귀여운 별이 캐릭터와 함께 신나는 동작 미션을 수행해요!

## 게임 내용

### ROM 운동 항목
| 동작 | ROM 분류 | 아이콘 |
|------|----------|--------|
| 팔을 앞으로 들어요 | 어깨 굴곡 (Shoulder Flexion) | 💪 |
| 독수리처럼 날개를 펴요 | 어깨 외전 (Shoulder Abduction) | 🦅 |
| 하늘에 손닿아요 | 어깨 완전 거상 (Full Elevation) | 🌈 |
| 팔꿈치를 구부려요 | 팔꿈치 굴곡 (Elbow Flexion) | 🦾 |
| 무릎을 높이 들어요 | 고관절 굴곡 (Hip Flexion) | 🦵 |
| 신나게 제자리 걸음 | 고관절 굴곡 리듬 (Marching) | 🥁 |
| 별모양 점프 | 전신 운동 (Full Body) | ⭐ |
| 손을 흔들어요 | 어깨+손목 복합 | 👋 |

### 레벨 구성
- **레벨 1** — 워밍업 (3가지 동작)
- **레벨 2** — 도전 (4가지 동작)
- **레벨 3** — 파워업 (5가지 동작)

## 파일 구조

```
rom-dance-game/
├── index.html     # 게임 메인 HTML
├── style.css      # 디자인 스타일
├── game.js        # 게임 엔진 & ROM 운동 데이터
├── vercel.json    # Vercel 배포 설정
└── README.md
```

## GitHub → Vercel 배포 방법

### 1. GitHub 리포지토리 생성
```bash
git init
git add .
git commit -m "첫 번째 커밋: ROM 댄스 게임"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/rom-dance-game.git
git push -u origin main
```

### 2. Vercel 배포
1. [vercel.com](https://vercel.com) 접속 → GitHub으로 로그인
2. **"Add New Project"** 클릭
3. GitHub 리포지토리 선택 (`rom-dance-game`)
4. Framework: **Other** 선택
5. **Deploy** 클릭 → 자동 배포 완료!

### 3. 자동 배포 설정
- GitHub에 push할 때마다 Vercel이 자동으로 재배포합니다

## 게임 사용 방법

- **시작하기** 버튼을 누르면 게임 시작
- 별이 캐릭터의 동작을 보고 아이가 따라해요
- 타이머(링) 안에 수행하면 **"했어요!"** 버튼 클릭
- 어려우면 **"어려워요"** 버튼으로 건너뛰기
- 키보드: `Enter/스페이스` = 완료, `Esc` = 건너뛰기

## 임상 메모 (치료사용)

- 각 동작에는 ROM 분류명이 내부적으로 태그되어 있어 추후 데이터 기록 확장 가능
- Hold time은 레벨별로 조정 가능 (`holdMultiplier`)
- 동작 풀(pool)을 수정하면 특정 부위 집중 훈련 가능

---
Made with ❤️ for little star dancers 🌟
