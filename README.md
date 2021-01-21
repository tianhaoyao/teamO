
# TeamO

React Webapp that divides summoners into even teams. Frontend using Material-UI. Made with Riot-API. Uses Redux to keep states for players.

## Calculating Summoner Score

Summoner Score = rank + (lp * multiplier) + bonus

| Rank         | Base Score | LP Multiplier |
|--------------|------------|---------------|
| Iron I       | 650        | 1             |
...
| Gold I       | 2200       | 1.5           |
...
| Platinum I   | 2850       | 1.5           |
...
| Diamond I    | 3600       | 1.7           |
| Master+      | 3900       | lp^1.07       |

Bonus = csBonus + kdaBonus + kpBonus + goldBonus + dmgBonus

*Note: bonuses might be negative if stat is below threshold*

### CS Bonus
The more CS/minute you have, the higher score this awards. Junglers and Support unaffected.

### KDA Bonus
The higher KDA, the higher score. More applicable for Jungle and Support.

### KP Bonus
Compares your Kill Participation score to your team. The higher KP compared to your team yields a better score. Junglers and Support are affected more, Top lane is affected less.

### Gold Bonus
Compares your gold earned relative to your team. The higher share the higher score. Support unaffected.

### Damage Bonus
Compares your damage done to enemy team relative to your team. The higher share the higher score. Jungler affected less, and Support even less.

## Matchmaking Algorithm

Models constraint satisfaction problems (CSP).

1. After finding out every player's preferred role, take the 2 best players of each role and insert them on different teams
2. The remaining players are fillers, and are sorted based on skill level
3. The fillers are given a random open position (prioritizing the current score of both teams, whichever is less)
4. From top lane downwards, the players are swapped between the two teams. If the score difference decreases, the players remain in their new teams. Otherwise, keep the original arrangement.

## Running the Program

```
$ git clone https://github.com/tianhaoyao/teamO.git
$ cd teamO
$ yarn install
$ yarn start
```
RiotGames API key required in .env file

# teamO
