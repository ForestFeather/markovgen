// Returns the source text
function get() { return document.getElementById('in').value; }

// Clears the source textbox
function clear() { document.getElementById('in').value = ''; }

// Writes to the output textbox
function set(v) { document.getElementById('out').value = v; }

// Holds the state information
var cache = {
    '_START': []
};

function ConvertTextToMarkov( inputText ) {
    // Get the source text and split it into words
    var text = inputText.split(/\s+/g);

    if (!text.length)
        return;

    // Add it to the start node's list of possibility
    cache['_START'].push(text[0]);

    // Now go through each word and add it to the previous word's node
    for (var i = 0; i < text.length - 1; i++) {
        if (!cache[text[i]])
            cache[text[i]] = [];
        cache[text[i]].push(text[i + 1]);

        // If it's the beginning of a sentence, add the next word to the start node too
        if (text[i].match(/[\!\?\.]$/))
            cache['_START'].push(text[i + 1]);
    }
};

function GenerateMarkovChain() {
    // Start with the root node
    var currentWord = '_START';
    var str = '';
    var chain = 0;
    var words = 0;
    var terminate = false;

    // Generate between min 5 and 25 words of text max
    var minNumWords = Math.floor((Math.random() * 20) + 5);

    while(!terminate) {
        // Increase words counter;
        ++words;

        // Follow a random node, append it to the string, and move to that node
        var rand = Math.floor(Math.random() * cache[currentWord].length);
        str += cache[currentWord][rand];

        // No more nodes to follow? Start again. (Add a period to make things look better.)
        if (!cache[cache[currentWord][rand]]||cache[currentWord][rand].match(/[\!\?\.]$/)) {
            chain++;
            break;

            currentWord = '_START';
            if (!cache[currentWord][rand].match(/[\?\!\.]$/))
                str += '. ';
            else
                str += ' ';
        } else {
            currentWord = cache[currentWord][rand];
            str += ' ';
        }

        // If our chain is > 1 and we've hit our word limit...
        if( chain >= 1 && words >= minNumWords ) { terminate = true; }
    }
    
    // Return the resulting string
    return str;
}
