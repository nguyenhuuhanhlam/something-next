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
					? 	<a href={ props?.href }>
							<Image
								src={props?.icon}
								width={ 64 }
								height={ 64 }
								alt=""
							/>
						</a>
					: null
				}
				<div>{ props?.text }</div>
			</div>
		</div>
	)
}

export default function HomePage() {
	return (
		<div>
			<div className="app-icons pt-5">
				<AppIconLink text="E-Book" icon="/ebook-icon.svg" href="http://ebook.aresen.vn:8088" />
				<AppIconLink text="NAS Drive" icon="/nas-drive-icon.svg" href="http://drive.aresen.vn" />
				<AppIconLink text="NAS Cloud" icon="/cloud-icon.png" href="http://cloud.aresen.vn" />
			</div>
		</div>
	)
}