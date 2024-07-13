document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.menu-icon').addEventListener('click', function() {
        document.getElementById('menu').classList.toggle('show');
    });
});

function runAnalysis() {
    const jobAdFile = document.getElementById('job-ad').files[0];
    const cvFiles = document.getElementById('cv').files;

    if (!job
