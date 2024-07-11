const fs = require('fs');
const readline = require('readline');

async function getTopKUsersWithLongestStreaks(logFilePath, K) {
    const userActivity = {};

    const fileStream = fs.createReadStream(logFilePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    // Step 1: Parse the log file and store user activities
    for await (const line of rl) {
        const [date, userId, action] = line.split(',').map(entry => entry.trim());
        if (!userActivity[userId]) {
            userActivity[userId] = { dates: new Set(), totalActivities: 0 };
        }
        userActivity[userId].dates.add(date);
        userActivity[userId].totalActivities += 1;
    }

    // Step 2: Compute the longest streak for each user
    const userStreaks = Object.keys(userActivity).map(userId => {
        const dates = Array.from(userActivity[userId].dates).sort();
        let longestStreak = 0;
        let currentStreak = 1;
        
        for (let i = 1; i < dates.length; i++) {
            const currentDate = new Date(dates[i]);
            const previousDate = new Date(dates[i - 1]);
            const difference = (currentDate - previousDate) / (1000 * 60 * 60 * 24); // difference in days
            
            if (difference === 1) {
                currentStreak += 1;
            } else {
                longestStreak = Math.max(longestStreak, currentStreak);
                currentStreak = 1;
            }
        }
        
        longestStreak = Math.max(longestStreak, currentStreak);
        
        return {
            userId,
            longestStreak,
            totalActivities: userActivity[userId].totalActivities
        };
    });

    // Step 3: Sort the users by streak length, then by total activities
    userStreaks.sort((a, b) => {
        if (b.longestStreak === a.longestStreak) {
            return b.totalActivities - a.totalActivities;
        }
        return b.longestStreak - a.longestStreak;
    });
    console.log(userStreaks)
    // Step 4: Return the top K users, ensuring K does not exceed the number of users with streaks
    const topUsers = userStreaks.slice(0, Math.min(K, userStreaks.length)).map(user => user.userId);
    return topUsers;
}

// Example usage
const logFilePath = 'logfile.txt';
const K = 66; // Example of a large value for K

getTopKUsersWithLongestStreaks(logFilePath, K).then(topUsers => {
    console.log(topUsers);
}).catch(err => {
    console.error(err);
});