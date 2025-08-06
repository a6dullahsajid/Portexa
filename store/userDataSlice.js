import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: "",
    template: "",
    details: {
        name: "",
        title: "",
        profileImage: "",
        bio: "",
        resume: "",
        skills: [],
        experience: [],
        projects: [],
        connectDesc: "",
        email: "",
        linkedin: "",
        github: "",
        x: "",
    },
};

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        setTemplate: (state, action) => {
            state.template = action.payload;
        },
        setName: (state, action) => {
            state.details.name = action.payload;
        },
        setTitle: (state, action) => {
            state.details.title = action.payload;
        },
        setProfileImage: (state, action) => {
            state.details.profileImage = action.payload;
        },
        setBio: (state, action) => {
            state.details.bio = action.payload;
        },
        setResume: (state, action) => {
            state.details.resume = action.payload;
        },
        setSkills: (state, action) => {
            state.details.skills = action.payload;
        },
        setExperience: (state, action) => {
            state.details.experience = action.payload;
        },
        setProjects: (state, action) => {
            state.details.projects = action.payload;
        },
        setConnectDesc: (state, action) => {
            state.details.connectDesc = action.payload;
        },
        setEmail: (state, action) => {
            state.details.email = action.payload;
        },
        setLinkedin: (state, action) => {
            state.details.linkedin = action.payload;
        },
        setGithub: (state, action) => {
            state.details.github = action.payload;
        },
        setX: (state, action) => {
            state.details.x = action.payload;
        },
        resetUserData: () => initialState,
        initializeUserData: (state, action) => {
            const user = action.payload;
            if (user) {
                state.userName = user.userName;
                state.template = user.template;
                state.details.name = user.details.name;
                state.details.title = user.details.title;
                state.details.profileImage = user.details.profileImage;
                state.details.bio = user.details.bio;
                state.details.resume = user.details.resume;
                state.details.skills = user.details.skills;
                state.details.experience = user.details.experience;
                state.details.projects = user.details.projects;
                state.details.connectDesc = user.details.connectDesc;
                state.details.email = user.details.email;
                state.details.linkedin = user.details.linkedin;
                state.details.github = user.details.github;
                state.details.x = user.details.x;
            }
        },
    },
});

export const {
    setUserName,
    setTemplate,
    setName,
    setTitle,
    setProfileImage,
    setBio,
    setResume,
    setSkills,
    setExperience,
    setProjects,
    setConnectDesc,
    setEmail,
    setLinkedin,
    setGithub,
    setX,
    resetUserData,
    initializeUserData,
} = userDataSlice.actions;

export default userDataSlice.reducer;
