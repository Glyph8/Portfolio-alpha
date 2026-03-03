# Portfolio Detail README Overflow Fix

## TL;DR
- **문제**: Portfolio Detail 화면에서 README 영역이 오른쪽으로 튀어나옴.
- **원인**: 전역 `box-sizing`이 기본값(`content-box`)이라 `.readme`의 `width: 100%`에 패딩이 추가로 합산됨.
- **해결**: `reset.css`에 `html { box-sizing: border-box; }`와 `*, *::before, *::after { box-sizing: inherit; }`를 선언해 모든 요소를 `border-box`로 전환.

## 상세 내용
1. **재현 조건**
   - Portfolio Detail 페이지 진입
   - README 컨테이너 `.readme`에 `width: 100%` + `padding: 2.4rem` 적용
   - 전역 `box-sizing` 미설정 → 기본값 `content-box`
2. **왜 문제가 되었나?**
   - `content-box`에서는 패딩과 보더가 `width` 바깥에 더해짐.
   - `.readme`의 실효 폭이 부모 폭보다 4.8rem 커져서 오른쪽을 침범.
3. **수정 방법**
   ```css
   /* src/styles/reset.css */
   html {
     box-sizing: border-box;
   }

   *, *::before, *::after {
     box-sizing: inherit;
   }
   ```
   - `html`을 기준으로 잡고 모든 요소가 이를 상속하도록 설정.
   - 필요 시 특정 요소만 `content-box`로 되돌릴 수 있어 부작용 관리에 유리.
4. **효과**
   - README 카드가 부모 폭 안에 정확히 맞춰짐.
   - 다른 카드/버튼/레이아웃도 동일 규칙을 사용해 padding 조정 시 예측 가능.
   - 향후 UI 컴포넌트 작성 시 별도 보정 없이 일정한 박스 모델 유지.

## 추후 확인 포인트
- 새 컴포넌트 작성 시 `width` + `padding` 조합이 정상적으로 동작하는지 확인.
- 특정 서드파티 라이브러리가 `content-box` 가정을 한다면 해당 컴포넌트에서만 덮어쓰는 방식으로 예외 처리.
