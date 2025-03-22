import { IPost } from "@/interfaces/Post";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PopupState {
	isCreatePostPopupOpen: boolean;
	isEditPostPopupOpen: boolean;
	isDeletePostPopupOpen: boolean;
	isEditUserPopupOpen: boolean;
	isMenuPopupOpen: boolean;
	isGetToLoginPopupOpen: boolean;
	isFullPostPopupOpen: boolean;
	isLocationPopupOpen: boolean;
	postIdToDelete: number | null;
	postIdToUpdate: number | null;
	postIdToOpen: number | null;
	selectedLocation: IPost | null;
}

const initialState: PopupState = {
	isCreatePostPopupOpen: false,
	isEditPostPopupOpen: false,
	isDeletePostPopupOpen: false,
	isEditUserPopupOpen: false,
	isMenuPopupOpen: false,
	isGetToLoginPopupOpen: false,
	isFullPostPopupOpen: false,
	isLocationPopupOpen: false,
	postIdToDelete: null,
	postIdToUpdate: null,
	postIdToOpen: null,
	selectedLocation: null
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
		openFullPostPopup: state => {
			state.isFullPostPopupOpen = true;
		},
		closeFullPostPopup: state => {
			state.isFullPostPopupOpen = false;
		},
		openLocationPopup: (state, action: PayloadAction<IPost>) => {
			state.isLocationPopupOpen = true;
			state.selectedLocation = action.payload;
		},
		closeLocationPopup: state => {
			state.isLocationPopupOpen = false;
			state.selectedLocation = null;
		}
		// openLocationPopup: state => {
		// 	state.isLocationPopupOpen = true;
		// },
		// closeLocationPopup: state => {
		// 	state.isLocationPopupOpen = false;
		// }
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
	closeFullPostPopup,
	openLocationPopup,
	closeLocationPopup
} = popupSlice.actions;

export const popupReduser = popupSlice.reducer;
