import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PopupState {
	isCreatePostPopupOpen: boolean;
	isEditPostPopupOpen: boolean;
	isDeletePostPopupOpen: boolean;
	isEditUserPopupOpen: boolean;
	isMenuPopupOpen: boolean;
	postIdToDelete: number | null;
}

const initialState: PopupState = {
	isCreatePostPopupOpen: false,
	isEditPostPopupOpen: false,
	isDeletePostPopupOpen: false,
	isEditUserPopupOpen: false,
	isMenuPopupOpen: false,
	postIdToDelete: null
};

const popupSlice = createSlice({
	name: "popup",
	initialState,
	reducers: {
		openCreatePostPopup: state => {
			state.isCreatePostPopupOpen = true;
		},
		closeCreatePostPopup: state => {
			state.isCreatePostPopupOpen = false;
		},
		openEditPostPopup: state => {
			state.isEditPostPopupOpen = true;
		},
		closeEditPostPopup: state => {
			state.isEditPostPopupOpen = false;
		},
		openDeletePostPopup: (state, action: PayloadAction<number>) => {
			state.isDeletePostPopupOpen = true;
			state.postIdToDelete = action.payload;
		},
		closeDeletePostPopup: state => {
			state.isDeletePostPopupOpen = false;
			state.postIdToDelete = null;
		},
		openEditUserPopup: state => {
			state.isEditUserPopupOpen = true;
		},
		closeEditUserPopup: state => {
			state.isEditUserPopupOpen = false;
		},
		openMenuPopup: state => {
			state.isMenuPopupOpen = true;
		},
		closeMenuPopup: state => {
			state.isMenuPopupOpen = false;
		}
	}
});

export const {
	openCreatePostPopup,
	closeCreatePostPopup,
	openEditPostPopup,
	closeEditPostPopup,
	openDeletePostPopup,
	closeDeletePostPopup,
	openEditUserPopup,
	closeEditUserPopup,
	openMenuPopup,
	closeMenuPopup
} = popupSlice.actions;

export const popupReduser = popupSlice.reducer;
