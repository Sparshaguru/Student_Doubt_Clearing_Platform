document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("antigravity-bg");
    const ctx = canvas.getContext("2d");

    let width, height;
    let mouse = { x: null, y: null };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    document.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Capsule particle class
    class Capsule {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.length = Math.random() * 12 + 6;
            this.width = 3;
            this.angle = Math.random() * Math.PI;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.alpha = Math.random() * 0.8 + 0.2;
        }

        update() {
            if (mouse.x !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 160) {
                    this.x -= dx * 0.015;
                    this.y -= dy * 0.015;
                }
            }

            this.x += this.speedX;
            this.y += this.speedY;

            if (
                this.x < -50 ||
                this.x > width + 50 ||
                this.y < -50 ||
                this.y > height + 50
            ) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);

            ctx.fillStyle = `rgba(180, 70, 255, ${this.alpha})`;
            ctx.beginPath();
            ctx.roundRect(
                -this.length / 2,
                -this.width / 2,
                this.length,
                this.width,
                this.width
            );
            ctx.fill();

            ctx.restore();
        }
    }

    // Create particles
    const particles = [];
    const PARTICLE_COUNT = 350;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Capsule());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p) => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
});
