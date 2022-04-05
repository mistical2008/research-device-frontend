import { RecoilRoot } from 'recoil'

function withRecoil(component: () => React.ReactNode) {
    return () => <RecoilRoot>{component()}</RecoilRoot>
}
export { withRecoil }
