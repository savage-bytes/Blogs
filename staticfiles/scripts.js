// Sample data to simulate posts from a database
let posts = [
    {
        id: 2,
        title: "Five Books That Changed My Perspective",
        body: "Literature has the unique ability to transport us into different mindsets and challenge our existing beliefs. Over the years, I've encountered several books that fundamentally altered how I view the world. In this post, I'll share five books that had the most profound impact on my thinking and why they might change yours too.",
        created_at: "March 10, 2025",
        featured: false
    },
    {
        id: 1,
        title: "The Art of Slow Reading in a Fast-Paced World",
        body: "In today's digital age, we often find ourselves skimming through content rather than deeply engaging with it. The practice of slow reading offers a counterbalance to our hurried consumption of information. By deliberately slowing down and immersing ourselves in text, we can enhance comprehension, increase enjoyment, and rediscover the pleasure of getting lost in a good book.",
        created_at: "March 5, 2025",
        featured: true
    }
];

// Admin credentials
const adminCredentials = {
    username: "admin",
    password: "password123"
};

// DOM Elements
const blogPostsContainer = document.getElementById('blogPosts');
const featuredPostContainer = document.getElementById('featuredPost');
const adminPanel = document.getElementById('adminPanel');
const adminDashboard = document.getElementById('adminDashboard');
const loginForm = document.getElementById('loginForm');
const postForm = document.getElementById('postForm');
const loginMessage = document.getElementById('loginMessage');
const postMessage = document.getElementById('postMessage');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayPosts();
    displayFeaturedPost();
    
    // Add event listeners
    loginForm.addEventListener('submit', handleLogin);
    postForm.addEventListener('submit', handlePostSubmission);
});

// Display all blog posts
function displayPosts() {
    blogPostsContainer.innerHTML = '';
    
    // Sort posts in reverse chronological order (newest first)
    const sortedPosts = [...posts].reverse();
    
    sortedPosts.forEach(post => {
        // Create article structure similar to Django template
        const article = document.createElement('article');
        
        // Using the Django template structure you provided
        article.innerHTML = `
            <a href="post/${post.id}" style="text-decoration: none; color: inherit;">
                <h2 style="font-size: 24px; margin-bottom: 10px;">${post.title}</h2>
                <p style="color: #666; margin-bottom: 15px;">${post.created_at}</p>
                <p>${truncateWords(post.body, 20)}</p>
            </a>
        `;
        
        blogPostsContainer.appendChild(article);
    });
}

// Display featured post
function displayFeaturedPost() {
    const featuredPost = posts.find(post => post.featured);
    
    if (featuredPost) {
        featuredPostContainer.innerHTML = `
            <h3>${featuredPost.title}</h3>
            <p class="date">${featuredPost.created_at}</p>
            <p>${truncateWords(featuredPost.body, 30)}</p>
        `;
    } else {
        featuredPostContainer.innerHTML = '<p>No featured post available.</p>';
    }
}

// Toggle admin panel visibility
function toggleAdminPanel() {
    adminPanel.classList.toggle('hidden');
    adminDashboard.classList.add('hidden');
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === adminCredentials.username && password === adminCredentials.password) {
        adminPanel.classList.add('hidden');
        adminDashboard.classList.remove('hidden');
        loginMessage.textContent = '';
        loginForm.reset();
    } else {
        loginMessage.textContent = 'Invalid username or password';
        loginMessage.style.color = 'red';
    }
}

// Handle post form submission
function handlePostSubmission(e) {
    e.preventDefault();
    
    const title = document.getElementById('postTitle').value;
    const body = document.getElementById('postBody').value;
    const featured = document.getElementById('featuredPostCheck').checked;
    
    // Create new post object
    const newPost = {
        id: posts.length + 1,
        title: title,
        body: body,
        created_at: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        featured: featured
    };
    
    // If this post is featured, remove featured flag from other posts
    if (featured) {
        posts.forEach(post => post.featured = false);
    }
    
    // Add new post to the array
    posts.push(newPost);
    
    // Update the display
    displayPosts();
    displayFeaturedPost();
    
    // Show success message
    postMessage.textContent = 'Post published successfully!';
    postMessage.style.color = 'green';
    
    // Reset the form
    postForm.reset();
    
    // Automatically hide admin dashboard after a delay
    setTimeout(() => {
        logout();
        postMessage.textContent = '';
    }, 2000);
}

// Logout function
function logout() {
    adminDashboard.classList.add('hidden');
}

// Helper function to truncate text to a specific number of words
function truncateWords(text, count) {
    const words = text.split(' ');
    if (words.length > count) {
        return words.slice(0, count).join(' ') + '...';
    }
    return text;
}