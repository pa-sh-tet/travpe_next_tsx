import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PopupState {
	isCreatePostPopupOpen: boolean;
	isEditPostPopupOpen: boolean;
	isDeletePostPopupOpen: boolean;
	isEditUserPopupOpen: boolean;
	isMenuPopupOpen: boolean;
	isGetToLoginPopupOpen: boolean;
	isFullPostPopupOpen: boolean;
	postIdToDelete: number | null;
	postIdToUpdate: number | null;
	postIdToOpen: number | null;
}

const initialState: PopupState = {
	isCreatePostPopupOpen: false,
	isEditPostPopupOpen: false,
	isDeletePostPopupOpen: false,
	isEditUserPopupOpen: false,
	isMenuPopupOpen: false,
	isGetToLoginPopupOpen: false,
	isFullPostPopupOpen: false,
	postIdToDelete: null,
	postIdToUpdate: null,
	postIdToOpen: null
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
		openEditPostPopup: (state, action: PayloadAction<number>) => {
			state.isEditPostPopupOpen = true;
			state.postIdToUpdate = action.payload;
		},
		closeEditPostPopup: state => {
			state.isEditPostPopupOpen = false;
			state.postIdToUpdate = null;
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
		},
		openGetToLoginPopup: state => {
			state.isGetToLoginPopupOpen = true;
		},
		closeGetToLoginPopup: state => {
			state.isGetToLoginPopupOpen = false;
		},
		openFullPostPopup: (state, action: PayloadAction<number>) => {
			state.isFullPostPopupOpen = true;
			state.postIdToOpen = action.payload;
		},
		closeFullPostPopup: state => {
			state.isFullPostPopupOpen = false;
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
	closeMenuPopup,
	openGetToLoginPopup,
	closeGetToLoginPopup,
	openFullPostPopup,
	closeFullPostPopup
} = popupSlice.actions;

export const popupReduser = popupSlice.reducer;
