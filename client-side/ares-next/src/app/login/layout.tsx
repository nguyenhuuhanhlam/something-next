import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'LAB.X V1.0 | Login',
	viewport: 'width=device-width, initial-scale=1.0, maximum-scale = 1.0'
}

export default function LoginLayout ({children}:{children: React.ReactNode}) {
	return <>{children}</>
}