# Activity Streak Analyzer

This Node.js script analyzes a log file containing user activity data from a social media platform. It identifies users with the longest consecutive activity streaks and returns the top K users based on streak length and total activity count.

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Usage

### Function: `getTopKUsersWithLongestStreaks(logFilePath, K)`

This function takes two parameters:
- `logFilePath`: Path to the log file containing user activity data.
- `K`: Number of top users with the longest streaks to retrieve.

#### Example

```javascript
const { getTopKUsersWithLongestStreaks } = require('./activityAnalyzer');

const logFilePath = 'path/to/logfile.txt';
const K = 5; // Retrieve top 5 users with longest streaks

getTopKUsersWithLongestStreaks(logFilePath, K)
    .then(topUsers => {
        console.log(`Top ${K} users with longest streaks:`, topUsers);
    })
    .catch(err => {
        console.error('Error:', err);
    });
```

### Input Format

The log file should be formatted with each line representing an activity entry in the following format:
```
YYYY-MM-DD, UserId, Action
```
Where:
- `YYYY-MM-DD`: Date of the activity.
- `UserId`: Unique identifier for the user.
- `Action`: Type of action performed ('post', 'like', 'comment', etc.).

### Output

The function outputs an array of user IDs representing the top K users with the longest consecutive activity streaks.

## Notes

- Ensure the log file contains sufficient data for meaningful analysis.
- Adjust `K` based on the size and nature of your log file to get relevant results.

---

Adjust the paths, installation instructions, and any additional details according to your specific project setup and requirements. This README provides a clear overview of how to use the function and what to expect as output, making it easier for users to understand and integrate into their projects.