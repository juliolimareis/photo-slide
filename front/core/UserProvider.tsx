import { User } from "../models/User"
import UserContext from "./UserContext"
import { Album } from "../models/Album"
import useErrorRequest from "./hooks/useErrorRequest"
import { useCallback, useEffect, useState } from "react"
import { ProfileRepository } from "../provider/ProfileRepository"
import { Photo } from "../models/Photo"

export const UserProvider = (props: any) => {

	const errorRequest = useErrorRequest()

  const profileRepository = new ProfileRepository()
  
	const [user, setUser] = useState<User>({})
	const [albums, setAlbums] = useState<Album[]>([])
	
	const [isGetUser, setGetUser] = useState<boolean>(false)
	const [loaderAlbums, setLoaderAlbums] = useState<boolean>(false)

	const [photos, setPhotos] = useState<Photo[]>([])
	const [loaderPhotos, setLoaderPhotos] = useState<boolean>(false)

  useEffect(() => {
		if (isGetUser) {
			getUser()
		}
  },[isGetUser])

	const getPhotos = (idAlbum: string) => {	
		setLoaderPhotos(true)	
		profileRepository.fetchPhotos(idAlbum).then(
			res => setPhotos(res.data),
			err => errorRequest(err)
		).finally(() => setLoaderPhotos(false))
	}

	const getAlbums = () => {
		setLoaderAlbums(true)
		profileRepository.fetchAlbums().then(
			res => setAlbums(res.data),
			err => errorRequest(err)
		).finally(() => setLoaderAlbums(false))
	}

  const getUser = () => {
    profileRepository.fetchProfile().then(
      res => {
				setUser(res.data)
			},
      error => errorRequest(error)
    )
  }

	return (
		<UserContext.Provider value={{
				user,
				isGetUser,
				setGetUser,
				
				albums,
				setAlbums,
				loaderAlbums,	
				getAlbums,
				
				photos,
				setPhotos,
				loaderPhotos,
				getPhotos

			}}
		>
			{props.children}
		</UserContext.Provider>
	)
}