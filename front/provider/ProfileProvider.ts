import api, { getHeaders } from "../config/api";

import { AxiosResponse } from "axios";

import { User } from "../models/User";
import { Album } from '../models/Album';
import { Photo } from './../models/Photo';

export class ProfileProvider {
	async fetchProfile(): Promise<AxiosResponse<User>> {
		return await api.get<User>('/profile', {headers: getHeaders()})
	}

// *********************** Album ***********************
	async fetchAlbums(): Promise<AxiosResponse<Album[]>> {
		return await api.get<Album[]>('/profile/album', {headers: getHeaders()})
	}
	
	async fetchAlbum(idAlbum: string): Promise<AxiosResponse<Album>> {
		return await api.get<Album>(`/profile/album/${idAlbum}`, {headers: getHeaders()})
	}
	
	async addAlbum(album: Album): Promise<AxiosResponse<Album>> {
		return await api.post<Album>('/profile/album', album, {headers: getHeaders()})
	}

	async deleteAlbum(idAbum: string): Promise<void> {
		return await api.delete(`/profile/album/${idAbum}`, {headers: getHeaders()})
	}

	// *********************** Photo ***********************
	
	async uploadPhoto(idAlbum: string, photo: FormData): Promise<AxiosResponse<Photo>> {
		return await api.post<Photo>(`/profile/album/${idAlbum}/photo/upload`, photo, {headers: getHeaders()})
	}
	
	async fechPhotos(idAlbum: string): Promise<AxiosResponse<Photo[]>> {
		return await api.get<Photo[]>(`/profile/album/${idAlbum}/photo`, {headers: getHeaders()})
	}
	
	async updatePhoto(idPhoto: number, photo: Photo): Promise<AxiosResponse<Photo>> {
		return await api.put<Photo>(`/profile/photo/${idPhoto}`, photo, {headers: getHeaders()})
	}

	async deletePhoto(idPhoto: number): Promise<void> {
		return await api.delete(`/profile/photo/${idPhoto}`, {headers: getHeaders()})
	}
}
