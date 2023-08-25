import { Metadata } from 'next'
import Image from 'next/image'

import './home.css'

export const metadata: Metadata = {
	title: 'LAB.X V1.0 | Home'
}

const AppIconLink = (props) => {
	return (
		<div className="app-link">
			<div>
				{
					props?.icon
					? 	<a	href={ props?.href }
							style={{ alignSelf:'center' }}
						>
							<Image
								src={props?.icon}
								width={ 64 }
								height={ 64 }
								alt=""
							/>
						</a>
					: null
				}
				<div style={{ textAlign:'center' }}>{ props?.text }</div>
			</div>
		</div>
	)
}

export default function HomePage() {
	return (
		<div className="home">
			<div className="app-icons my-5">
				<AppIconLink text="E-Book" icon="/ebook-icon.svg" href="http://ebook.aresen.vn:8088" />
				<AppIconLink text="NAS Drive" icon="/nas-drive-icon.svg" href="http://drive.aresen.vn" />
				<AppIconLink text="NAS Cloud" icon="/nas-synology-icon.svg" href="http://cloud.aresen.vn" />
				<AppIconLink text="Superset" icon="/superset-icon.svg" href="http://115.75.90.30:8888" />
				<AppIconLink text="Bitrix24" icon="/bitrix24-icon.svg" href="https://aresen.bitrix24.com" />
				<AppIconLink text="N8N" icon="/n8n-icon.svg" href="http://115.75.90.30:5678" />
			</div>
		</div>
	)
}