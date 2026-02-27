import CustomDialog from "./CustomDialog";

export default function Login() {
  return (
    <div>
        <CustomDialog
        triggerButton={<button>로그인 하기</button>}
        title="로그인"
        description="프로젝트 추가/수정/삭제를 위해 로그인이 필요합니다.">
            <h2 className="dialogTitle">로그인</h2>
        </CustomDialog>
    </div>
  )
}
