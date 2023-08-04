import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'LAB.X V1.0 | Login',
}

export default function LoginLayout ({children}:{children: React.ReactNode}) {
	return <>{children}</>
}