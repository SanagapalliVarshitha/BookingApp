import {api} from './api';
export const getMovies=async()=>{ const res=await api.get('/movies'); return res.data; }
