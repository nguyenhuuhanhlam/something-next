import { Metadata } from 'next'
import Image from 'next/image'

import './home.css'

export const metadata: Metadata = {
	title: 'LAB.X V1.0 | Home'
}

const AppLink = (props) => {
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
				<AppLink text="E-Book" icon="/ebook-icon.png" href="http://ebook.aresen.vn:8088" />
				<AppLink text="NAS Drive" icon="/drive-icon.png" href="http://drive.aresen.vn" />
				<AppLink text="Cloud" icon="/cloud-icon.png" href="http://cloud.aresen.vn" />
			</div>
		</div>
	)
}