document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.menu-icon').addEventListener('click', function() {
        document.getElementById('menu').classList.toggle('show');
    });

    document.getElementById('run-analysis-btn').addEventListener('click', async function() {
        const jobAd = document.getElementById('job-ad').files[0];
        const cvs = document.getElementById('cv').files;
        const email = document.getElementById('email').value;

        if (!jobAd) {
            alert('Please upload a job description.');
            return;
        }

        if (cvs.length === 0) {
            alert('Please upload at least one CV.');
            return;
        }

        if (!email) {
            alert('Please enter your email address.');
            return;
        }

        const formData = new FormData();
        formData.append('job-ad', jobAd);
        for (let i = 0; i < cvs.length; i++) {
            formData.append('cv', cvs[i]);
        }
        formData.append('email', email);

        try {
            const response = await fetch('/api/run-analysis', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Analysis is being processed. Results will be sent to your email.');
            } else {
                alert('There was an error processing your request. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error processing your request. Please try again.');
        }
    });
});
