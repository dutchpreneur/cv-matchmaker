from flask import Flask, request, jsonify, render_template
from flask_mail import Mail, Message
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Configuration for file uploads
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Configuration for Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.your-email-provider.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your_email@example.com'
app.config['MAIL_PASSWORD'] = 'your_password'
app.config['MAIL_DEFAULT_SENDER'] = 'your_email@example.com'

mail = Mail(app)

# Route for the home page
@app.route('/')
def index():
    return render_template('index.html')

# Route for handling file uploads
@app.route('/api/run-analysis', methods=['POST'])
def run_analysis():
    if 'job-ad' not in request.files or 'cv' not in request.files or 'email' not in request.form:
        return jsonify({'error': 'Missing required parameters'}), 400

    job_ad_file = request.files['job-ad']
    cv_files = request.files.getlist('cv')
    email = request.form['email']

    job_ad_filename = secure_filename(job_ad_file.filename)
    job_ad_path = os.path.join(app.config['UPLOAD_FOLDER'], job_ad_filename)
    job_ad_file.save(job_ad_path)

    cv_paths = []
    for cv_file in cv_files:
        cv_filename = secure_filename(cv_file.filename)
        cv_path = os.path.join(app.config['UPLOAD_FOLDER'], cv_filename)
        cv_file.save(cv_path)
        cv_paths.append(cv_path)

    # Placeholder for running analysis
    analysis_results = run_llm_analysis(job_ad_path, cv_paths)

    # Send email with results
    send_results_email(email, analysis_results)

    return jsonify({'message': 'Analysis is being processed. Results will be sent to your email.'}), 200

def run_llm_analysis(job_ad_path, cv_paths):
    # Placeholder function to run analysis using LLM
    # You would implement the actual analysis logic here
    # For demonstration, we'll return dummy results
    results = {
        'rankings': [
            {'cv': 'cv1.pdf', 'score': 90, 'strengths': 'Strong skills in Python', 'weaknesses': 'Lacks experience in AI', 'questions': ['Q1?', 'Q2?', 'Q3?', 'Q4?', 'Q5?']},
            {'cv': 'cv2.pdf', 'score': 80, 'strengths': 'Good experience in AI', 'weaknesses': 'Lacks leadership experience', 'questions': ['Q1?', 'Q2?', 'Q3?', 'Q4?', 'Q5?']}
        ]
    }
    return results

def send_results_email(recipient, results):
    msg = Message('Candidate Analysis Results', recipients=[recipient])
    msg.body = format_results(results)
    mail.send(msg)

def format_results(results):
    # Format the analysis results into a readable string
    formatted_results = 'Here are the results of the candidate analysis:\n\n'
    for ranking in results['rankings']:
        formatted_results += f"CV: {ranking['cv']}\n"
        formatted_results += f"Score: {ranking['score']}\n"
        formatted_results += f"Strengths: {ranking['strengths']}\n"
        formatted_results += f"Weaknesses: {ranking['weaknesses']}\n"
        formatted_results += "Questions:\n"
        for question in ranking['questions']:
            formatted_results += f"- {question}\n"
        formatted_results += "\n"
    return formatted_results

if __name__ == '__main__':
    app.run(debug=True)
