document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.menu-icon').addEventListener('click', function() {
        document.getElementById('menu').classList.toggle('show');
    });
});

function runAnalysis() {
    const jobAdFile = document.getElementById('job-ad').files[0];
    const cvFiles = document.getElementById('cv').files;

    if (!jobAdFile) {
        alert('Please upload a job description.');
        return;
    }

    if (cvFiles.length === 0) {
        alert('Please upload at least one CV.');
        return;
    }

    // Placeholder for API call to the LLM for analysis
    alert('Analysis is running...');
    // Here you would typically make an API call to your backend to handle the file uploads and processing
}
document.getElementById('run-analysis-btn').addEventListener('click', function() {
    // Add functionality to trigger the LLM analysis here
    alert('Running Candidate Analysis...');
});
