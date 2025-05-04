import api from "./api";

const a = "api/document"

const upload = (file) => api.post(`${a}/upload`,file);

const documentService ={
    upload
};

export default documentService;
