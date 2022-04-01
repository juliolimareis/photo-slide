import React, { SetStateAction } from 'react';
import { User } from '../models/User';
import { Album } from '../models/Album';
import { Photo } from '../models/Photo';

const UserContext = React.createContext({
	//user
	user: {} as User,
	isGetUser: false,
	setGetUser: (state: SetStateAction<boolean>) => {},
	
	//albums
	albums: [] as Album[],
	setAlbums: (state: SetStateAction<Album[]>) => {},
	loaderAlbums: false,
	getAlbums: () => {},

	//photos
	photos: [] as Photo[],
	setPhotos: (state: SetStateAction<Photo[]>) => {},
	loaderPhotos: false,
	getPhotos: (idAlbum: string) => {},
});

export default UserContext;

