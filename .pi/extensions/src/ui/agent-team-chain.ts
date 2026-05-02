/**
 * Agent Team Chain Extension - VSC Extension System
 *
 * This extension enables agent team functionality with memory,
 * team management, and cleanup capabilities.
 *
 * @module agent-team-chain
 * @author Zerwiz Extension System
 */

import * as fs from "fs";
import * as pi from "pi";

// Import from agent-team.ts
import { initialize } from "../../ui/agent-team";

// Extension configuration
interface TeamChainConfig {
  teamName: string;
  activeTeam: string;
  memoryEnabled: boolean;
  cleanupInterval: number;
  maxMemorySize: number;
}

// Global state - properly declared
const teams: string[] = ["agent", "coder", "reviewer", "architect"];
let activeTeamName: string = "agent";
let activeToolsList: string[] = [];
let lastMemoryExport: Date | null = null;
let exportCount: number = 0;
let exportErrorCount: number = 0;
const maxExports: number = 100; // Prevent unlimited exports
const cleanupIntervalMs: number = 24 * 60 * 60 * 1000; // One day

// Default configuration
const defaultConfig: TeamChainConfig = {
  teamName: "agent-team",
  activeTeam: "agent",
  memoryEnabled: true,
  cleanupInterval: 7, // days
  maxMemorySize: 5 * 1024 * 1024, // 5 MB
};

// Error handling
function handleError(error: Error, context: string = "Extension error"): void {
  console.error(`❌ [${context}]:`, error?.message || error);
  exportErrorCount++;

  // Reset after 5 errors
  if (exportErrorCount > 5) {
    console.log("⚠️  Too many errors, resetting error count.");
    exportErrorCount = 0;
  }
}

// Memory availability check
function isMemoryAvailable(): boolean {
  try {
    const stat = fs.statSync(".pi/memory-export.json");
    const currentSize = stat.size;
    return currentSize < defaultConfig.maxMemorySize;
  } catch {
    return true;
  }
}

// Memory cleanup
async function cleanupMemory(
  maxSizeMB: number = 20,
  retentionDays: number = 7,
): Promise<void> {
  try {
    const now = Date.now();
    const retentionMs = retentionDays * 24 * 60 * 60 * 1000;

    // Remove exports older than retention period
    for await (const file of fs.readdirSync(".pi")) {
      if (file.match(/memory-export/i)) {
        try {
          const fileStat = fs.statSync(`.pi/${file}`);
          if (now - fileStat.mtimeMs > retentionMs) {
            await pi.remove(`.pi/${file}`);
            console.log(`🗑️  Cleaned up old export: ${file}`);
          }
        } catch {
          // Skip if file doesn't exist
        }
      }
    }
  } catch (error) {
    handleError(error as Error, "Memory cleanup");
  }
}

// Memory export with limits
async function exportMemorySafe(
  format: string = "json",
  outputPath: string = ".pi/memory-export.json",
): Promise<void> {
  try {
    // Check export limits
    if (exportCount >= maxExports) {
      console.log(`⚠️  Max exports (${maxExports}) reached, skipping this one`);
      return;
    }

    // Ensure memory is available
    if (!isMemoryAvailable()) {
      console.log("⚠️  Memory not available for export");
      return;
    }

    // Load memory and export
    const memory = await pi.getCurrentMemory();
    const exportContent = {
      timestamp: new Date().toISOString(),
      format,
      memory,
      team: activeTeamName,
    };

    await pi.writeFile(outputPath, JSON.stringify(exportContent, null, 2));

    exportCount++;
    lastMemoryExport = new Date();

    console.log(
      `✅ Memory exported to ${outputPath}` +
        `(Export #${exportCount}/${maxExports})`,
    );
  } catch (error) {
    handleError(error as Error, "Memory export");
  }
}

// Tool registration
function registerTools(): void {
  try {
    activeToolsList = [
      ...activeToolsList,
      "memory-export:json",
      "memory-export:text",
      "memory-export:md",
      "memory-export:preview",
    ];

    console.log(`🔧 Registered ${activeToolsList.length} tools`);
  } catch (error) {
    handleError(error as Error, "Tool registration");
  }
}

// Initialize extension
async function initializeExtension(
  teamName: string = activeTeamName,
): Promise<void> {
  try {
    console.log(`🔧 Initializing agent-team-chain extension. ..`);

    teams.push(teamName);
    activeTeamName = teamName;

    // Initialize agent team
    await initialize();

    // Set active tools
    registerTools();

    // Setup cleanup interval
    setInterval(async () => {
      try {
        await cleanupMemory();
      } catch (error) {
        handleError(error as Error, "Cleanup");
      }
    }, cleanupIntervalMs);

    // Ensure export directory exists
    await pi.ensureDirectory(".pi");
    await pi.ensureDirectory(".pi/notebooks");
    await pi.ensureDirectory(".pi/backups");

    console.log(`✅ Extension initialized for team: ${activeTeamName}`);
  } catch (error) {
    handleError(error as Error, "Extension init");
  }
}

// Team switching
async function switchTeam(
  newTeamName: string,
  retainMemory: boolean = false,
): Promise<boolean> {
  try {
    if (!teams.includes(newTeamName)) {
      console.log(`⚠️  Team '${newTeamName}' not found in registered teams`);
      return false;
    }

    activeTeamName = newTeamName;
    console.log(`🔄 Switched to team: ${activeTeamName}`);

    if (!retainMemory) {
      await cleanupMemory();
    }

    return true;
  } catch (error) {
    handleError(error as Error, "Team switch");
    return false;
  }
}

// Load or initialize memory
async function initializeMemory(
  memoryKey: string = activeTeamName,
): Promise<void> {
  try {
    await pi.ensureDirectory(".pi");

    // Check if memory file exists
    const filePath = `.pi/${memoryKey}.mem`;
    const exists = fs.existsSync(filePath);

    if (!exists) {
      await pi.writeFile(filePath, "{}", { atomic: true });
      console.log(`💾 Created memory file: ${filePath}`);
    } else {
      console.log(`📄 Memory file exists: ${filePath}`);
    }
  } catch (error) {
    handleError(error as Error, "Memory init");
  }
}

// Main export handler
export async function handleAgentTeamExport(
  format: string = "json",
  key: string = activeTeamName,
): Promise<string> {
  try {
    console.log(`📤 Exporting team ${key} memory in ${format} format. ..`);

    await exportMemorySafe(
      format,
      `.pi/${key}.memory.${format === "json" ? "json" : "md"}`,
    );

    return `✅ Team ${key} exported to .pi/${key}.memory.md\n`;
  } catch (error) {
    handleError(error as Error, "Team export");
    return `❌ Failed to export team ${key}\n`;
  }
}

// Export all teams
export async function exportAllTeams(
  outputPath: string = ".pi/memory-export-all.json",
): Promise<void> {
  try {
    console.log(`📦 Exporting all team states to: ${outputPath}`);

    const exportData = {
      timestamp: new Date().toISOString(),
      teams: teams.map((team) => ({
        name: team,
        active: activeTeamName === team,
      })),
      exportCount,
    };

    await pi.writeFile(outputPath, JSON.stringify(exportData, null, 2));
    console.log(`✅ All teams exported to ${outputPath}`);
  } catch (error) {
    handleError(error as Error, "All teams export");
  }
}

// Cleanup before shutdown
export function shutdown(): void {
  try {
    console.log("🛡️  Agent team extension shutting down. ..");

    // Final memory cleanup
    cleanupMemory(20, 7);

    // Reset state
    activeTeamName = "agent";
    exportCount = 0;
  } catch (error) {
    handleError(error as Error, "Shutdown cleanup");
  }

  console.log("✅ Agent team extension closed");
}

// Export team list
export function getTeamList(): string[] {
  return teams;
}

// Get active team name
export function getActiveTeam(): string {
  return activeTeamName;
}

// Export last export timestamp
export function getLastExport(): Date | null {
  return lastMemoryExport;
}

// Main export command (default)
export async function exportMemories(
  key: string = activeTeamName,
  format: string = "json",
): Promise<boolean> {
  try {
    if (!key) {
      key = activeTeamName;
    }

    console.log(`📤 Exporting memory for team: ${key} (format: ${format})...`);
    await exportMemorySafe(
      format,
      `.pi/${key}.memory.${format === "json" ? "json" : "md"}`,
    );

    return true;
  } catch (error) {
    handleError(error as Error, "Export memories");
    return false;
  }
}

// Main export command with error handling
export default async function exportMemoriesCommand(options?: {
  format?: string;
  key?: string;
  cleanup?: boolean;
  maxSize?: number;
}): Promise<void> {
  try {
    // Handle cleanup option
    if (options?.cleanup) {
      console.log("🧹 Cleaning up memory exports...");
      await cleanupMemory();
      console.log("✅ Cleanup complete");
      return;
    }

    // Export based on format
    const format = options?.format || "json";
    const key = options?.key || activeTeamName;

    // Export memory
    await exportMemories(key, format);

    // Verify the export was successful
    const exportPath = `.pi/${key}.memory.${format}`;
    const exists = fs.existsSync(exportPath);

    if (!exists) {
      console.log(`❌ Export file not found at: ${exportPath}`);
      return;
    }

    console.log(`✅ Memory exported successfully to: ${exportPath}`);
  } catch (error) {
    handleError(error as Error, "Export command");

    // Default message
    console.log(`💡 Try running: \`pi memory-export:json\``);
  }
}
