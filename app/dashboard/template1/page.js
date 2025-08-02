"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./FormPage.module.css";
import Navbar from "@/components/Navbar";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setName, setProfileImage, setTitle, setBio, setResume, setSkills, setExperience, setProjects, setConnectDesc, setX, setGithub, setLinkedin, setEmail } from "@/store/userDataSlice";

export default function PortfolioForm() {

    useEffect(() => {
        const bgCanvas = document.getElementById("bgCanvas");
        if (bgCanvas) bgCanvas.style.display = "none";
        return () => {
            if (bgCanvas) bgCanvas.style.display = "block";
        };
    }, []);


    const dispatch = useDispatch();

    const nameSelector = useSelector(state => state.userData.details.name);
    const titleSelector = useSelector(state => state.userData.details.title);
    const profileSelector = useSelector(state => state.userData.details.profile);
    const templateSelector = useSelector(state => state.userData.template);
    const bioSelector = useSelector(state => state.userData.details.bio);
    const resumeSelector = useSelector(state => state.userData.details.resume);
    const skillsSelector = useSelector(state => state.userData.details.skills);
    const experienceSelector = useSelector((state) => state.userData.details.experience);
    const projectsSelector = useSelector((state) => state.userData.details.projects);
    const connectDescSelector = useSelector((state) => state.userData.details.connectDesc);
    const emailSelector = useSelector((state) => state.userData.details.email);
    const linkedinSelector = useSelector((state) => state.userData.details.linkedin);
    const githubSelector = useSelector((state) => state.userData.details.github);
    const xSelector = useSelector((state) => state.userData.details.x);

    const [step, setStep] = useState(1);
    const [localProfileFile, setLocalProfileFile] = useState(null);

    const [skillInput, setSkillInput] = useState("");
    const [experienceInput, setExperienceInput] = useState({
        company: "",
        position: "",
        from: "",
        to: "",
        work: ""
    });

    const [project, setProject] = useState({
        title: "",
        desc: "",
        tech: "",
        image: "",
        prevLink: "",
        githubLink: ""
    });

    const handleNameChange = (e) => {
        dispatch(setName(e.target.value));
    }

    const handleTitleChange = (e) => {
        dispatch(setTitle(e.target.value))
    }

    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLocalProfileFile(file);
        }
        console.log(file);
    };

    const handleUploadProfileImage = async () => {
        if (!localProfileFile) {
            toast.error("No file selected!");
            return;
        }

        if (localProfileFile.size > 10 * 1024 * 1024) {
            toast.error("File must be smaller than 10MB");
            return;
        }

        const uploadingToast = toast.loading("Uploading image...");

        try {
            // Get signature from backend
            const sigRes = await fetch("/api/upload");
            const { timestamp, signature, apiKey, cloudName, folder } = await sigRes.json();

            const formData = new FormData();
            formData.append("file", localProfileFile);
            formData.append("api_key", apiKey);
            formData.append("timestamp", timestamp);
            formData.append("signature", signature);
            formData.append("folder", folder);

            // Upload to Cloudinary
            const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: formData,
            });

            const data = await uploadRes.json();
            toast.dismiss(uploadingToast);

            if (uploadRes.ok) {
                toast.success("Image uploaded!");
                // console.log("Cloudinary URL:", data.secure_url);
                dispatch(setProfileImage(data.secure_url));
            } else {
                toast.error(data.error?.message || "Upload failed");
            }
        } catch (err) {
            toast.dismiss(uploadingToast);
            toast.error("Something went wrong");
            console.error(err);
        }
    };






    const handleBioChange = (e) => {
        dispatch(setBio(e.target.value))
    }

    const handleResumeChange = (e) => {
        dispatch(setResume(e.target.value))
    }

    const handleAddSkill = () => {
        const trimmed = skillInput.trim();
        if (trimmed && !skillsSelector.includes(trimmed)) {
            dispatch(setSkills([...skillsSelector, trimmed]));
            setSkillInput("");
        }
    };

    const handleRemoveSkill = (indexToRemove) => {
        const updatedSkills = skillsSelector.filter((_, idx) => idx !== indexToRemove);
        dispatch(setSkills(updatedSkills));
    };

    const handleProjectChange = (e) => {
        const { name, value } = e.target;
        setProject((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProjectImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProject((prev) => ({
                ...prev,
                image: file
            }));
        }
    };

    const handleAddProject = async () => {
        const { title, prevLink, githubLink, image } = project;

        if (!title || !prevLink || !githubLink) {
            toast.error("Please fill in all required project fields.");
            return;
        }

        let imageUrl = "";

        if (image) {
            if (image.size > 10 * 1024 * 1024) {
                toast.error("Image must be smaller than 10MB");
                return;
            }

            const uploadingToast = toast.loading("Uploading image...");

            try {
                const sigRes = await fetch("/api/upload");
                const { timestamp, signature, apiKey, cloudName, folder } = await sigRes.json();

                const formData = new FormData();
                formData.append("file", image);
                formData.append("api_key", apiKey);
                formData.append("timestamp", timestamp);
                formData.append("signature", signature);
                formData.append("folder", folder);

                const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    method: "POST",
                    body: formData,
                });

                const data = await uploadRes.json();
                toast.dismiss(uploadingToast);

                if (uploadRes.ok) {
                    imageUrl = data.secure_url;
                    toast.success("Image uploaded successfully!");
                } else {
                    toast.error(data.error?.message || "Upload failed");
                    return;
                }
            } catch (err) {
                toast.dismiss(uploadingToast);
                toast.error("Something went wrong during upload.");
                console.error(err);
                return;
            }
        }

        const updatedProjects = [...projectsSelector, {
            ...project,
            image: imageUrl,
        }];

        dispatch(setProjects(updatedProjects));

        setProject({
            title: "",
            desc: "",
            tech: "",
            image: "",
            prevLink: "",
            githubLink: ""
        });
    };



    const handleRemoveProject = (indexToRemove) => {
        const updatedProjects = projectsSelector.filter((_, index) => index !== indexToRemove);
        dispatch(setProjects(updatedProjects));
    };

    const handleExperienceChange = (e) => {
        const { name, value } = e.target;
        setExperienceInput((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddExperience = () => {
        const { company, position, from, to, work } = experienceInput;
        if (!company || !position || !work || !from || !to) {
            toast.error("Please fill all experience fields.");
            return;
        }
        console.log("experience add");
        const updated = [...experienceSelector, experienceInput];
        console.log(updated, "add experience se");
        dispatch(setExperience(updated));
        setExperienceInput({ company: "", position: "", from: "", to: "", work: "" });
    };

    useEffect(() => {
        console.log(experienceSelector, "experience selector se");
    }, [experienceSelector])


    const handleRemoveExperience = (indexToRemove) => {
        const updated = experienceSelector.filter((_, index) => index !== indexToRemove);
        dispatch(setExperience(updated));
    };



    const handleConnectDescChange = (e) => {
        dispatch(setConnectDesc(e.target.value))
    }
    const handleEmailChange = (e) => {
        dispatch(setEmail(e.target.value))
    }
    const handleLinkedinChange = (e) => {
        dispatch(setLinkedin(e.target.value))
    }
    const handleGithubChange = (e) => {
        dispatch(setGithub(e.target.value))
    }
    const handlexChange = (e) => {
        dispatch(setX(e.target.value))
    }

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const userData = useSelector((state) => state.userData);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit Chala");
        console.log(userData);

        try {
            const res = await fetch("/api/saveUserData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const result = await res.json();

            if (result.success) {
                toast.success("User data saved successfully!");
                console.log("Saved ID:", result.insertedId);
            } else {
                toast.error("Failed to save data.");
                console.log(result.error);
            }
        } catch (err) {
            console.log("Error submitting form:", err);
            toast.error("Something went wrong.");
        }
    };



    return (
        <>
            <Navbar />
            <main className={styles.template1}>
                <form onSubmit={handleSubmit} className={styles.portfolioForm}>
                    <h2 className={styles.stepTitle}>
                        {step === 1 ? "Basic Info" : step === 2 ? "Projects" : step === 3 ? "Experience" : "Contact Info"}
                    </h2>

                    {/* STEP 1 - Personal Info + Skills */}
                    {step === 1 && (
                        <div className={styles.formSection}>
                            <input
                                name="name"
                                placeholder="Full Name"
                                onChange={handleNameChange}
                                value={nameSelector}
                                className={styles.formInput}
                            />
                            <input
                                name="title"
                                placeholder="Role / Title"
                                onChange={handleTitleChange}
                                value={titleSelector}
                                className={styles.formInput}
                            />
                            <div className={styles.uploadImage}>
                                <input
                                    name="profileImage"
                                    type="file"
                                    placeholder="Upload Image(max 10MB)"
                                    accept="image/png, image/jpeg"
                                    onChange={handleProfileChange}
                                    className={`${styles.formInput} ${styles.imageInput}`}
                                />
                                <button
                                    type="button"
                                    onClick={handleUploadProfileImage}
                                    className={styles.btnUpload}
                                >
                                    Add Profile Image
                                </button>
                            </div>
                            <textarea
                                name="bio"
                                placeholder="About Me"
                                onChange={handleBioChange}
                                value={bioSelector}
                                className={styles.formTextarea}
                            />

                            <input
                                name="resume"
                                placeholder="Resume Link"
                                onChange={handleResumeChange}
                                value={resumeSelector}
                                className={styles.formInput}
                            />
                            <div className={styles.skillInputWrapper}>
                                <input
                                    name="skill"
                                    type="text"
                                    placeholder="Enter a skill"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    className={styles.formInput}
                                />
                                <button type="button" onClick={handleAddSkill} className={styles.btnAdd}>Add Skill</button>
                            </div>

                            <div className={styles.skillList}>
                                {skillsSelector.map((skill, index) => (
                                    <div key={index} className={styles.skillChip}>
                                        {skill}
                                        <button type="button" onClick={() => handleRemoveSkill(index)} className={styles.removeSkill}>×</button>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.formNav}>
                                <Link href="/dashboard">
                                    <button type="button" className={styles.btnPrev}>Go Back</button>
                                </Link>
                                <button type="button" onClick={nextStep} className={styles.btnNext}>Next</button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2 - Projects */}
                    {step === 2 && (
                        <div className={styles.formSection}>
                            {projectsSelector.map((proj, index) => (
                                <div key={index} className={styles.projectEntry}>
                                    <div className={styles.formInput}>{proj.title}</div>
                                    <div className={styles.formInput}>{proj.desc}</div>
                                    <div className={styles.formInput}>{proj.tech}</div>
                                    <div className={styles.formInput}>{proj.prevLink}</div>
                                    <div className={styles.formInput}>{proj.githubLink}</div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveProject(index)}
                                        className={styles.btnDelete}
                                    >
                                        × Remove
                                    </button>
                                </div>
                            ))}
                            <input
                                type="text"
                                name="title"
                                placeholder="Project Title"
                                value={project.title}
                                onChange={handleProjectChange}
                                className={styles.formInput}
                            />

                            <textarea
                                name="desc"
                                placeholder="Project Description"
                                value={project.desc}
                                onChange={handleProjectChange}
                                className={styles.formTextarea}
                            />

                            <input
                                type="text"
                                name="tech"
                                placeholder="Technologies Used"
                                value={project.tech}
                                onChange={handleProjectChange}
                                className={styles.formInput}
                            />
                            {/* <div className="upload-image"> */}
                            <input
                                name="projectImage"
                                type="file"
                                placeholder="Upload Image(max 10MB)"
                                accept="image/png, image/jpeg"
                                onChange={handleProjectImageChange}
                                className={`${styles.formInput} ${styles.imageInput}`}
                            />
                            {/* </div> */}

                            <input
                                type="text"
                                name="prevLink"
                                placeholder="Live Preview Link"
                                value={project.prevLink}
                                onChange={handleProjectChange}
                                className={styles.formInput}
                            />

                            <input
                                type="text"
                                name="githubLink"
                                placeholder="GitHub Repo Link"
                                value={project.githubLink}
                                onChange={handleProjectChange}
                                className={styles.formInput}
                            />
                            <button type="button" onClick={handleAddProject} className={styles.btnAdd}>
                                Add Project
                            </button>

                            <div className={styles.formNav}>
                                <button type="button" onClick={prevStep} className={styles.btnPrev}>Back</button>
                                <button type="button" onClick={nextStep} className={styles.btnNext}>Next</button>
                            </div>
                        </div>
                    )}

                    {/* STEP-3 Expereince Details */}
                    {step === 3 && (
                        <div className={styles.formSection}>
                            <p>You can skip this if you are a fresher</p>
                            {experienceSelector.map((exp, index) => (
                                <div key={index} className={styles.projectEntry}>
                                    <div className={styles.formInput}>{exp.company}</div>
                                    <div className={styles.formInput}>{exp.position}</div>
                                    <div className={styles.formInput}>{exp.work}</div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveExperience(index)}
                                        className={styles.btnDelete}
                                    >
                                        × Remove
                                    </button>
                                </div>
                            ))}

                            <input
                                type="text"
                                name="company"
                                placeholder="Company Name"
                                value={experienceInput.company}
                                onChange={handleExperienceChange}
                                className={styles.formInput}
                            />

                            <input
                                type="text"
                                name="position"
                                placeholder="Position"
                                value={experienceInput.position}
                                onChange={handleExperienceChange}
                                className={styles.formInput}
                            />
                            <input
                                type="text"
                                name="from"
                                placeholder="Start date"
                                value={experienceInput.from}
                                onChange={handleExperienceChange}
                                className={styles.formInput}
                            />
                            <input
                                type="text"
                                name="to"
                                placeholder="End date"
                                value={experienceInput.to}
                                onChange={handleExperienceChange}
                                className={styles.formInput}
                            />

                            <textarea
                                type="text"
                                name="work"
                                placeholder="Describe your role in it"
                                value={experienceInput.work}
                                onChange={handleExperienceChange}
                                className={styles.formInput}
                            />

                            <button type="button" onClick={handleAddExperience} className={styles.btnAdd}>
                                Add Experience
                            </button>

                            <div className={styles.formNav}>
                                <button type="button" onClick={prevStep} className={styles.btnPrev}>Back</button>
                                <button type="button" onClick={nextStep} className={styles.btnNext}>Next</button>
                            </div>
                        </div>
                    )}
                    {step === 4 && (
                        <div className={styles.formSection}>
                            <textarea
                                name="connectDesc"
                                placeholder="Say something for your connect section"
                                onChange={handleConnectDescChange}
                                value={connectDescSelector}
                                className={styles.formTextarea}
                            />
                            <input
                                name="email"
                                placeholder="Email"
                                onChange={handleEmailChange}
                                value={emailSelector}
                                className={styles.formInput}
                            />
                            <input
                                name="linkedin"
                                placeholder="LinkedIn URL"
                                onChange={handleLinkedinChange}
                                value={linkedinSelector}
                                className={styles.formInput}
                            />
                            <input
                                name="github"
                                placeholder="GitHub URL"
                                onChange={handleGithubChange}
                                value={githubSelector}
                                className={styles.formInput}
                            />
                            <input
                                name="x"
                                placeholder="Twitter / X Profile"
                                onChange={handlexChange}
                                value={xSelector}
                                className={styles.formInput}
                            />
                            <div className={styles.formNav}>
                                <button type="button" onClick={prevStep} className={styles.btnPrev}>Back</button>
                                <button type="submit" className={styles.btnSubmit}>Finish</button>
                            </div>
                        </div>
                    )}
                </form>
            </main>
        </>
    );
}

