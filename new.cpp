#include <iostream>
#include <vector>
#include <bits/stdc++.h>
using namespace std;

const int MAX = 1e7;
const int NOT_CONNECTED = 1e9; // Use a large value for "not connected"

vector<vector<int>> distance(INT_MAX, vector<int>(INT_MAX, NOT_CONNECTED));

// Number of nodes
int nodesCount;

// Initialize all distances
void Initialize()
{
    for (int i = 1; i <= nodesCount; ++i)
    {
        for (int j = 1; j <= nodesCount; ++j)
        {
            distance[i][j] = (i == j) ? 0 : NOT_CONNECTED;
        }
    }
}

int main()
{
    Initialize();

    // Get the nodes count
    cin >> nodesCount;

    // Edges count
    int m;
    cin >> m;

    while (m--)
    {
        // Nodes - let the indexation begin from 1
        int a, b;

        // Edge weight
        int c;
        cin >> a >> b >> c;
        distance[a][b] = c;
    }

    // Floyd-Warshall
    for (int k = 1; k <= nodesCount; ++k)
    {
        for (int i = 1; i <= nodesCount; ++i)
        {
            for (int j = 1; j <= nodesCount; ++j)
            {
                if (distance[i][k] != NOT_CONNECTED && distance[k][j] != NOT_CONNECTED &&
                    (distance[i][j] == NOT_CONNECTED || distance[i][k] + distance[k][j] < distance[i][j]))
                {
                    distance[i][j] = distance[i][k] + distance[k][j];
                }
            }
        }
    }

    int diameter = -1;

    // Look for the most distant pair
    for (int i = 1; i <= nodesCount; ++i)
    {
        for (int j = 1; j <= nodesCount; ++j)
        {
            if (i != j && diameter < distance[i][j])
            {
                diameter = distance[i][j];
                // Output the most distant pair
                cout << i << " " << j << endl;
            }
        }
    }

    cout << diameter << endl;

    return 0;
}
