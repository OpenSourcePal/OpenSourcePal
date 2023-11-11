type Section = {
	section: string;
	resource: {
		title: string;
		body: string;
	}[];
};

const IntroductionToOS: Section = {
	section: 'Introduction To Open Source',
	resource: [
		{
			title: 'What is Open Source?',
			body: `**Open source** refers to software or projects whose source code is made *available to the public*, allowing anyone to view, use, modify, and distribute it. It's a collaborative approach to software development where the code is typically created and improved by a community of volunteers or developers from around the world.`,
		},
		{
			title: 'How can I contribute to open source projects?',
			body: `To contribute to open source projects, you can start by finding a project that interests you on GitHub. Then, you can contribute by fixing bugs, adding features, improving documentation, or helping with testing and reporting issues.`,
		},
		{
			title: 'What are the benefits of contributing to open source?',
			body: `Contributing to open source allows you to gain real-world coding experience, collaborate with a community of developers, build your portfolio, and give back to the open source community. It's a great way to learn and grow as a developer.`,
		},
		{
			title: 'What to consider in choosing a project',
			body: `When selecting an open source project, consider your interests, the programming languages and tools you are familiar with, the project's activity level, and the community's friendliness and responsiveness. It's important to choose a project that aligns with your skills and passions.`,
		},
	],
};

const UnderstandGithub: Section = {
	section: 'Understand GitHub',
	resource: [
		{
			title: 'What is an issue?',
			body: `An **[issue](https://www.youtube.com/watch?v=6HWw7rhwvtY)** is a specific task, bug, or feature request within a project repository. It serves as a centralized way to track and manage various tasks, discussions, and improvements related to the project's codebase. *Issues can range from bug reports, feature requests, to general discussions about the project.*`,
		},
		{
			title: 'What are Labels?',
			body: `**Labels** are tags or markers that provide additional context to issues. They categorize and classify issues based on various attributes like priority, type (bug, enhancement, documentation), or status (in progress, help wanted, etc.). They help in organizing and filtering issues to manage them efficiently.`,
		},
		{
			title: 'What are Assignees?',
			body: `**Assignees** are individuals responsible for working on an issue. When someone is assigned to an issue, it signifies that they are taking ownership of the problem, feature, or task described in that issue. Assignees can be developers, contributors, or team members who have committed to addressing the problem or implementing the requested feature.`,
		},
		{
			title: 'What is a Pull Request?',
			body: `A **pull request**, often called a PR, is a way to propose changes to a codebase on platforms like GitHub. It's like saying, "Hey, I've made some changes to the code, and I'd like the team to review and accept these changes." It's a way to collaborate on code with others.`,
		},
		{
			title: 'What are GitHub Actions?',
			body: `GitHub Action is a tool provided by GitHub. It helps you automate various tasks related to your code. For example, you can set up actions to automatically test your code, build and deploy your web applications, or even run some checks whenever someone creates a pull request. It's a way to make your development process smoother and more efficient. 
      <a href="http://www.youtube.com/watch?feature=player_embedded&v=R8_veQiYBjI" target="_blank"><img src="http://img.youtube.com/vi/R8_veQiYBjI/0.jpg" alt="Introduction to GitHub Actions" width="180" height="180" border="10" /></a>`,
		},
	],
};

const BasicGitCommand: Section = {
	section: 'Basic Git commands',
	resource: [
		{
			title: 'Git Init',
			body: `**git init**: When you run git init in a directory, it initializes a new Git repository. In simple terms, it sets up a place where Git can start tracking changes in your code. It creates a hidden folder called ".git" in that directory, which stores all the information about your version control, like the history of your changes, branches, and more. This is the first step to start using Git for version control in your project.
      \`\`\`git init\`\`\``,
		},
		{
			title: 'Git Clone',
			body: `**git clone <url>**: This command is used to copy an existing Git repository from a certain URL to your local machine. When you run this command and specify a URL (like a GitHub repository), Git creates a copy of that entire repository on your computer. It's a way to get a full copy of the code and its version history to work on or contribute to.  \n**Example:**
      \`\`\`git clone https://github.com/Dun-sin/Whisper.git\`\`\``,
		},
		{
			title: 'Git Add',
			body: `When you make a change you use **git add** to stage changes you've made. When you run "git add," you're telling Git to prepare these changes for the next commit (save) in your project's history. It's like saying, *Hey, Git, please keep track of these changes because I want to save them in my project's history soon.*  \n**Example of adding every file:**
      \`\`\`git add .\`\`\`  \n**Example of adding a specific file:**
      \`\`\`git add /relative/path/to/file\`\`\``,
		},
		{
			title: 'Git Commit',
			body: `When you make changes to your code, a commit is like saving those changes. It's like taking a snapshot of your code at that moment. You add a message to describe what you changed.  \n**Example:**
      \`\`\`git commit -m "Added a new feature to the login page"\`\`\``,
		},
		{
			title: 'Git Push',
			body: `After committing, you might want to share your changes with others. Pushing means you're sending your commits to a remote repository, like on GitHub. Others can see and work with your changes.  \n**Example:**
        \nTo push your local commits to a repository:
      \`\`\`git push origin main\`\`\``,
		},
		{
			title: 'Git Pull',
			body: `Pulling is the opposite of pushing. When others make changes to the code on the remote repository, you can use *pull* to get those changes to your local copy. It keeps your code up-to-date.  \n**Example:**
        \nTo pull your local commits to a repository:
      \`\`\`git pull origin main\`\`\``,
		},
		{
			title: 'Git Merge',
			body: ` Imagine two people working on the same project, making different changes. Merging is the process of combining those changes into one. It's like putting two puzzle pieces together.  \n**Example:**
      \`\`\`git merge feature-branch\`\`\`
      [![YouTube Video On Git Merge](http://img.youtube.com/vi/Q1kHG842HoI/0.jpg)](http://www.youtube.com/watch?v=Q1kHG842HoI)`,
		},
	],
};

const UnderstandGit: Section = {
	section: 'Understand Git',
	resource: [
		{
			title: 'What is Git?',
			body: `**[Git](https://git-scm.com/)** is a version control system that lets you *manage* and keep *track* of your source code *history*.
      [![Learn Git](http://img.youtube.com/vi/USjZcfj8yxE/0.jpg)](http://www.youtube.com/watch?v=USjZcfj8yxE)`,
		},
	],
};

export default [IntroductionToOS, UnderstandGit, BasicGitCommand, UnderstandGithub];
