import { Metadata } from 'next'

import { BTXContextProvider } from '@/contexts/btx.context'
import { appConfig } from '@/contexts/store'

export const metadata: Metadata = {
	title: `${ appConfig.title } | BTX Users`,
	viewport: appConfig.viewport
}

export default function BTXUsersLayout ({children}:{children: React.ReactNode}) {
	return <BTXContextProvider>{children}</BTXContextProvider>
}