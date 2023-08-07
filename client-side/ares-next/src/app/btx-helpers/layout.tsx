import { Metadata } from 'next'

import { BTXContextProvider } from '@/contexts/btx.context'

export const metadata: Metadata = {
	title: 'LAB.X V1.0 | BTX Helpers',
	viewport: 'width=device-width, initial-scale=1.0, maximum-scale = 1.0'
}

export default function BTXLayout ({children}:{children: React.ReactNode}) {
	return (
		<BTXContextProvider>
			{ children }
		</BTXContextProvider>
	)
}