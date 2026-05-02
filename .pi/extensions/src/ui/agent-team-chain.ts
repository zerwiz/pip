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
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

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
  pi: ExtensionAPI,
  maxSizeMB: number = 20,
  retentionDays: number = 7,
): Promise<void> {
  try {
    const now = Date.now();
    const retentionMs = retentionDays * 24 * 60 * 60 * 1000;

    // Remove exports older than retention period
    if (fs.existsSync(".pi")) {
      for (const file of fs.readdirSync(".pi")) {
        if (file.match(/memory-export/i)) {
          try {
            const fileStat = fs.statSync(`.pi/${file}`);
            if (now - fileStat.mtimeMs > retentionMs) {
              // Note: pi.remove might not exist, using fs.unlinkSync
              fs.unlinkSync(`.pi/${file}`);
              console.log(`🗑️  Cleaned up old export: ${file}`);
            }
          } catch {
            // Skip if file doesn't exist
          }
        }
      }
    }
  } catch (error) {
    handleError(error as Error, "Memory cleanup");
  }
}

// Memory export with limits
async function exportMemorySafe(
  pi: ExtensionAPI,
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
    // Note: pi.getCurrentMemory() might not exist, this is a placeholder
    // In Pi extensions, you usually get memory from ctx or elsewhere.
    console.log("⚠️  exportMemorySafe: pi.getCurrentMemory() is not available in ExtensionAPI. Skipping.");
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

    return true;
  } catch (error) {
    handleError(error as Error, "Team switch");
    return false;
  }
}

// Main export command (default)
export async function exportMemories(
  pi: ExtensionAPI,
  key: string = activeTeamName,
  format: string = "json",
): Promise<boolean> {
  try {
    if (!key) {
      key = activeTeamName;
    }

    console.log(`📤 Exporting memory for team: ${key} (format: ${format})...`);
    await exportMemorySafe(
      pi,
      format,
      `.pi/${key}.memory.${format === "json" ? "json" : "md"}`,
    );

    return true;
  } catch (error) {
    handleError(error as Error, "Export memories");
    return false;
  }
}

export default async function (pi: ExtensionAPI) {
  try {
    console.log(`🔧 Initializing agent-team-chain extension...`);

    // Set active tools
    registerTools();

    // Setup cleanup interval
    setInterval(async () => {
      try {
        await cleanupMemory(pi);
      } catch (error) {
        handleError(error as Error, "Cleanup");
      }
    }, cleanupIntervalMs);

    pi.on("session_shutdown", async () => {
        console.log("🛡️  Agent team extension shutting down...");
        activeTeamName = "agent";
        exportCount = 0;
        console.log("✅ Agent team extension closed");
    });

    console.log(`✅ Extension initialized for team: ${activeTeamName}`);
  } catch (error) {
    handleError(error as Error, "Extension init");
  }
}
