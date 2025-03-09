import axios from "axios";

export const api_url = "http://localhost:5000/api";

export const api = axios.create({
	baseURL: api_url,
	headers: {
		"Content-Type": "application/json"
	}
});
