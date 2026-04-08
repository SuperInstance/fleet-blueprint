export interface Env {
  // No KV bindings needed for this example
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // Health endpoint
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Main landing page
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(generateHTML(), {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-ancestors 'none'",
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff'
        }
      });
    }

    // 404 for other paths
    return new Response('Not Found', { status: 404 });
  }
};

function generateHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cocapn Fleet Blueprint</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-primary: #0a0a0f;
            --bg-secondary: #111118;
            --accent: #00E6D6;
            --accent-dark: #00b3a6;
            --text-primary: #f0f0f5;
            --text-secondary: #a0a0b0;
            --border: #222230;
            --card-bg: #151520;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.6;
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Typography */
        h1, h2, h3, h4 {
            font-weight: 600;
            line-height: 1.2;
            margin-bottom: 1rem;
        }
        
        h1 {
            font-size: 3.5rem;
            background: linear-gradient(135deg, var(--accent) 0%, #00b3a6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 0.5rem;
        }
        
        h2 {
            font-size: 2rem;
            color: var(--accent);
            border-bottom: 2px solid var(--border);
            padding-bottom: 0.5rem;
            margin-top: 3rem;
        }
        
        h3 {
            font-size: 1.5rem;
            color: var(--text-primary);
            margin-top: 2rem;
        }
        
        .subtitle {
            font-size: 1.25rem;
            color: var(--text-secondary);
            margin-bottom: 2rem;
        }
        
        .mono {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
        }
        
        /* Stats Bar */
        .stats-bar {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 1.5rem;
            margin: 2rem 0;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }
        
        .stat-item {
            text-align: center;
        }
        
        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            color: var(--accent);
            display: block;
        }
        
        .stat-label {
            font-size: 0.9rem;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        /* Architecture Diagram */
        .architecture {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 2rem;
            margin: 2rem 0;
            overflow-x: auto;
        }
        
        .layer {
            margin-bottom: 2rem;
            padding-left: 1rem;
            border-left: 3px solid var(--accent);
        }
        
        .layer-title {
            color: var(--accent);
            font-family: 'JetBrains Mono', monospace;
            margin-bottom: 0.5rem;
        }
        
        .layer-content {
            color: var(--text-secondary);
            font-family: 'JetBrains Mono', monospace;
            white-space: pre;
            line-height: 1.4;
        }
        
        /* Tables */
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            background: var(--card-bg);
            border-radius: 8px;
            overflow: hidden;
        }
        
        th {
            background: var(--bg-secondary);
            color: var(--accent);
            font-weight: 600;
            text-align: left;
            padding: 1rem;
            border-bottom: 2px solid var(--border);
        }
        
        td {
            padding: 1rem;
            border-bottom: 1px solid var(--border);
            color: var(--text-secondary);
        }
        
        tr:hover {
            background: rgba(0, 230, 214, 0.05);
        }
        
        /* Roadmap */
        .roadmap {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin: 2rem 0;
        }
        
        .phase {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 1.5rem;
            position: relative;
        }
        
        .phase::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: var(--accent);
            border-radius: 12px 0 0 12px;
        }
        
        .phase-title {
            color: var(--accent);
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
        }
        
        .phase-days {
            color: var(--text-secondary);
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }
        
        /* Quick Start */
        .quick-start {
            background: linear-gradient(135deg, rgba(0, 230, 214, 0.1) 0%, rgba(0, 179, 166, 0.05) 100%);
            border: 1px solid var(--accent);
            border-radius: 12px;
            padding: 2rem;
            margin: 2rem 0;
        }
        
        .code-block {
            background: var(--bg-primary);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 1.5rem;
            margin: 1rem 0;
            overflow-x: auto;
        }
        
        /* Footer */
        footer {
            margin-top: 4rem;
            padding: 2rem 0;
            border-top: 1px solid var(--border);
            text-align: center;
            color: var(--text-secondary);
            font-size: 0.9rem;
        }
        
        .footer-logo {
            color: var(--accent);
            font-family: 'JetBrains Mono', monospace;
            font-size: 1.2rem;
            margin-bottom: 1rem;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            h1 {
                font-size: 2.5rem;
            }
            
            .stats-bar {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .roadmap {
                grid-template-columns: 1fr;
            }
        }
        
        @media (max-width: 480px) {
            .stats-bar {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Hero Section -->
        <header style="padding: 4rem 0 2rem;">
            <h1>Cocapn Fleet Blueprint</h1>
            <p class="subtitle">Architecture diagram, integration matrix, and migration guide for the sovereign agent fleet</p>
        </header>
        
        <!-- Stats Bar -->
        <div class="stats-bar">
            <div class="stat-item">
                <span class="stat-value">65+</span>
                <span class="stat-label">Vessels</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">150+</span>
                <span class="stat-label">Repos</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">0</span>
                <span class="stat-label">API Keys</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">Open</span>
                <span class="stat-label">Source</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">12</span>
                <span class="stat-label">Equipment Modules</span>
            </div>
        </div>
        
        <!-- Architecture Diagram -->
        <section>
            <h2>Architecture Diagram</h2>
            <div class="architecture">
                <div class="layer">
                    <div class="layer-title">Layer 6: Admiral (Human)</div>
                    <div class="layer-content">← commands flow down</div>
                </div>
                <div class="layer">
                    <div class="layer-title">Layer 5: Emergence (13 repos)</div>
                    <div class="layer-content">skill-evolver → epiphany-engine → loop-closure → swarm-intuition → fleet-identity → collective-mind</div>
                </div>
                <div class="layer">
                    <div class="layer-title">Layer 4: Orchestration</div>
                    <div class="layer-content">loop-closure, epiphany-engine, meta-loop-evolver, flow-forge</div>
                </div>
                <div class="layer">
                    <div class="layer-title">Layer 3: Vessels (65+ themed deployments)</div>
                    <div class="layer-content">studylog, dmlog, makerlog, fishinglog, etc.</div>
                </div>
                <div class="layer">
                    <div class="layer-title">Layer 2: Equipment (12 modules)</div>
                    <div class="layer-content">crystal-graph, session-tracker, INCREMENTS-trust, compliance, etc.</div>
                </div>
                <div class="layer">
                    <div class="layer-title">Layer 1: Core</div>
                    <div class="layer-content">cocapn runtime, vessel.json, KV, emergence-bus, BYOK</div>
                </div>
            </div>
        </section>
        
        <!-- Integration Matrix -->
        <section>
            <h2>Integration Matrix</h2>
            <table>
                <thead>
                    <tr>
                        <th>Vessel Category</th>
                        <th>Core Equipment</th>
                        <th>Emergence Layer</th>
                        <th>Connections</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>StudyLog</td>
                        <td>Crystal Graph, Session Tracker</td>
                        <td>Skill Evolver</td>
                        <td>15+ vessels</td>
                    </tr>
                    <tr>
                        <td>DMLog</td>
                        <td>INCREMENTS-trust, Compliance</td>
                        <td>Epiphany Engine</td>
                        <td>22+ vessels</td>
                    </tr>
                    <tr>
                        <td>MakerLog</td>
                        <td>Flow Forge, Session Tracker</td>
                        <td>Loop Closure</td>
                        <td>18+ vessels</td>
                    </tr>
                    <tr>
                        <td>FishingLog</td>
                        <td>Compliance, Crystal Graph</td>
                        <td>Swarm Intuition</td>
                        <td>10+ vessels</td>
                    </tr>
                </tbody>
            </table>
        </section>
        
        <!-- Roadmap -->
        <section>
            <h2>4-Phase Roadmap</h2>
            <div class="roadmap">
                <div class="phase">
                    <div class="phase-title">Foundation</div>
                    <div class="phase-days">Days 1-14</div>
                    <ul style="color: var(--text-secondary); padding-left: 1.5rem;">
                        <li>Core runtime setup</li>
                        <li>Vessel.json standardization</li>
                        <li>Basic equipment modules</li>
                    </ul>
                </div>
                <div class="phase">
                    <div class="phase-title">Self-Evolution</div>
                    <div class="phase-days">Days 15-35</div>
                    <ul style="color: var(--text-secondary); padding-left: 1.5rem;">
                        <li>Emergence layer activation</li>
                        <li>Skill evolvers online</li>
                        <li>Auto-scaling vessels</li>
                    </ul>
                </div>
                <div class="phase">
                    <div class="phase-title">Edge Swarm</div>
                    <div class="phase-days">Days 36-60</div>
                    <ul style="color: var(--text-secondary); padding-left: 1.5rem;">
                        <li>Distributed orchestration</li>
                        <li>Swarm intuition networks</li>
                        <li>Edge deployment ready</li>
                    </ul>
                </div>
                <div class="phase">
                    <div class="phase-title">Market</div>
                    <div class="phase-days">Days 61-90</div>
                    <ul style="color: var(--text-secondary); padding-left: 1.5rem;">
                        <li>Vessel marketplace</li>
                        <li>Equipment exchange</li>
                        <li>BYOK ecosystem</li>
                    </ul>
                </div>
            </div>
        </section>
        
        <!-- Migration Guide -->
        <section>
            <h2>Migration Guide</h2>
            <h3>From LangGraph/CrewAI/AutoGen</h3>
            <table>
                <thead>
                    <tr>
                        <th>Framework</th>
                        <th>Key Difference</th>
                        <th>Migration Effort</th>
                        <th>Benefit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>LangGraph</td>
                        <td>Stateful → Stateless vessels</td>
                        <td>Medium</td>
                        <td>Zero API keys, BYOK</td>
                    </tr>
                    <tr>
                        <td>CrewAI</td>
                        <td>Centralized → Distributed orchestration</td>
                        <td>High</td>
                        <td>65+ vessel scalability</td>
                    </tr>
                    <tr>
                        <td>AutoGen</td>
                        <td>Conversation → Emergence patterns</td>
                        <td>Medium</td>
                        <td>Self-evolving skills</td>
                    </tr>
                </tbody>
            </table>
            
            <h3 style="margin-top: 2rem;">Step-by-Step Migration</h3>
            <ol style="color: var(--text-secondary); padding-left: 1.5rem; margin: 1rem 0;">
                <li>Export existing agent configurations</li>
                <li>Map to vessel.json schema</li>
                <li>Deploy core equipment modules</li>
                <li>Connect to emergence bus</li>
                <li>Activate swarm intuition layer</li>
            </ol>
        </section>
        
        <!-- Quick Start -->
        <section>
            <h2>Quick Start</h2>
            <div class="quick-start">
                <h3 style="color: var(--accent); margin-top: 0;">Get your fleet operational in 3 steps:</h3>
                <div class="code-block">
                    <div class="mono" style="color: var(--accent);"># 1. Fork the fleet blueprint</div>
                    <div class="mono" style="color: var(--text-primary); margin: 0.5rem 0;">git clone https://github.com/cocapn/fleet-blueprint</div>
                </div>
                <div class="code-block">
                    <div class="mono" style="color: var(--accent);"># 2. Deploy with Wrangler</div>
                    <div class="mono" style="color: var(--text-primary); margin: 0.5rem 0;">wrangler deploy --env production</div>
                </div>
                <div class="code-block">
                    <div class="mono" style="color: var(--accent);"># 3. Your fleet is alive</div>
                    <div class="mono" style="color: var(--text-primary); margin: 0.5rem 0;">curl https://your-fleet.workers.dev/health</div>
                </div>
            </div>
        </section>
        
        <!-- Footer -->
        <footer>
            <div class="footer-logo">COCAPN FLEET BLUEPRINT</div>
            <p>Sovereign agent architecture for the open ecosystem</p>
            <p style="margin-top: 1rem; font-size: 0.8rem;">Zero API keys • BYOK • Self-evolving • Edge-ready</p>
        </footer>
    </div>
    
    <script>
        // Simple health check indicator
        document.addEventListener('DOMContentLoaded', function() {
            fetch('/health')
                .then(response => response.json())
                .then(data => {
                    console.log('Fleet status:', data.status);
                })
                .catch(err => {
                    console.log('Health check:', err);
                });
        });
    </script>
</body>
</html>`;
}