// credit to  https://jsfiddle.net/tripolskypetr/cakLrzp2/
function mario() {

            let context = null;

            const getFrequency = (note = 1) => {
                switch (note) {
                    case 4:
                        return 440;
                    case 6:
                        return 392;
                    case 8:
                        return 349;
                    case 9:
                        return 330;
                    case 11:
                        return 294;
                    case 13:
                        return 262;
                    case 14:
                        return 247;
                    case 15:
                        return 233;
                    case 16:
                        return 220;
                    case 18:
                        return 196;
                    case 21:
                        return 165;
                    default:
                        return 0;
                }
            }

            const marioNotes = [
                9, 9, 0, 9, 0, 13, 9, 0, 6, 0, 0, 0, 0, 0, 0, 0,
                13, 0, 0, 18, 0, 0, 21, 0, 0, 16, 0, 14, 0, 15, 16, 0, 18, 9, 6, 4, 0, 8, 6, 0, 8, 6, 0, 9, 0, 13, 11, 13
            ];

            const sleep = (duration = 200) => new Promise((resolve) => {
                setTimeout(resolve, duration);
            });

            Array.prototype.forEachAsync = async function (fn) {
                for (let t of this) { await fn(t) }
            }

            const beep = (freq = 520, duration = 200, vol = 100) => {
                const oscillator = context.createOscillator();
                const gain = context.createGain();
                oscillator.connect(gain);
                oscillator.frequency.value = freq;
                oscillator.type = "square";
                gain.connect(context.destination);
                gain.gain.value = vol * 0.01;
                oscillator.start(context.currentTime);
                oscillator.stop(context.currentTime + duration * 0.001);
            }

            function go() {
                context = new AudioContext();
                marioNotes.forEachAsync(async (note) => {
                    await sleep();
                    beep(getFrequency(note));
                });
            }
go(); 
        }
