GitHub URL: https://jhall00.github.io/GUI-I/HW5/hw5.html

Link to repository: https://github.com/jhall00/GUI-I

Write up:

Everything in HW5 works as intended.
Users get a correctly weighted "random" assortment of 7 letters in their rack at the start. Users can drag and drop from their rack 
and vice versa. The score for the current word the user is creating on the board is calculated with each tile that is removed or added. 
The total game score is kept and updated once the users clicks the submit word button. The board is the cleared and the user's hand
is updated back to 7 (amount remaining in bag is adjusted as well). (Scores are calculated correcly based on bonus sqaures). 
A user can only place a new tile directly to the right of the previously placed tiles, no spaces (in accordance with the 
instructions). If a user removes a tile from the middle of their word on the board, and this creates a gap, the user will not be 
able to submit their word until that gap is filled with a tile. 

Tiles that are dragged from the rack and placed in "white space" will be bounced back to the user's rack. If you drop them on the right 
side of the board, the tile will bounce to the last open spot of the board.

Users can keep submitting words until the either choose to restart the game or they run out of tiles. When hey run out of tiles, 
they get an alert message informing them that all tiles have been used.

I implemented a swap option: If users don't like some or all of the tiles in their rack, they have the option to swap them out for 
new ones. To do this, they can place the tiles they want to be swapped in the swap area (grid background with the swap symbol). Once 
they have all the tiles places that they want to swap, they click "swap hand". This essentially places the tiles they had back in 
the mixed bag which we draw tiles from and replaces them with new random tiles. 

To implement the rack and the board pieces I used jQuery sortables and connected them. I limited the board spots to only allow one 
tile at a time. Tiles within the user's rack can be reordered before they are entered into the board. 