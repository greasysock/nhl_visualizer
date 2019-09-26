# NHL Visualizer

This project pulls in NHL scheduling data from the 2018-2019 season with the results from each game and uses that data to locally compute a leaderboard using 2 ranking methods. 

### Weighted Method

At the start of the season each game is worth half and as the season progesses at about the halfway point every game begins to fully count. This is applied to both Massey's Method and Colley's Method.

### Massey's Method
https://www.masseyratings.com/theory/massey.htm

Each game's final score counts for the winner and loser. All games are summed up to create a final matrix which gives you a rough estimation for team ranks that all adds up to 0.


### Colley's Method
https://www.colleyrankings.com/method.html

No scores are used to weigh the games, only wins and loses count with this method. It would not matter if Team A wins by 5 one game and Team B wins by 1 point-- these two games would weigh the same in the final matrix.

Overall, both methods seem to mirror the official leaderboards so I am convinced that these methods work pretty well with the NHL, but there are probably better ranking methods used for the NHL.
