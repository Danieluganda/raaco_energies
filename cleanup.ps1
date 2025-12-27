# Website Cleanup and Organization Script
# This PowerShell script helps organize and clean up the website files

Write-Host "Starting website cleanup and organization..." -ForegroundColor Green

# Create backup of original files
$backupDir = "original-files-backup"
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir
    Write-Host "Created backup directory: $backupDir" -ForegroundColor Yellow
}

# List of directories to clean up
$oldDirs = @(
    "10X Digital Startup Accelerator Challenge _ Outbox Africa_files",
    "10X Digital Startup Accelerator Challenge _ Outbox Africa_index_files", 
    "Our Story _ Outbox Africa_files"
)

# Back up and remove old directories
foreach ($dir in $oldDirs) {
    if (Test-Path $dir) {
        Write-Host "Backing up: $dir" -ForegroundColor Yellow
        Copy-Item $dir "$backupDir\$dir" -Recurse -Force
        
        Write-Host "Removing: $dir" -ForegroundColor Red
        Remove-Item $dir -Recurse -Force
    }
}

# List of old HTML files to back up and remove
$oldFiles = @(
    "10X Digital Startup Accelerator Challenge _ Outbox Africa.html",
    "10X Digital Startup Accelerator Challenge _ Outbox Africa_index.html",
    "Our Story _ Outbox Africa.html"
)

foreach ($file in $oldFiles) {
    if (Test-Path $file) {
        Write-Host "Backing up: $file" -ForegroundColor Yellow
        Copy-Item $file "$backupDir\$file"
        
        Write-Host "Removing: $file" -ForegroundColor Red
        Remove-Item $file -Force
    }
}

# Create any missing directories
$requiredDirs = @(
    "assets\css",
    "assets\js", 
    "assets\images",
    "assets\fonts",
    "components"
)

foreach ($dir in $requiredDirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force
        Write-Host "Created directory: $dir" -ForegroundColor Green
    }
}

# Display current structure
Write-Host "`nCurrent project structure:" -ForegroundColor Cyan
Get-ChildItem -Path . -Directory | ForEach-Object {
    Write-Host "  $($_.Name)/" -ForegroundColor White
    if ($_.Name -eq "assets") {
        Get-ChildItem -Path $_.FullName -Directory | ForEach-Object {
            Write-Host "    $($_.Name)/" -ForegroundColor Gray
            Get-ChildItem -Path $_.FullName -File | ForEach-Object {
                Write-Host "      $($_.Name)" -ForegroundColor DarkGray
            }
        }
    } elseif ($_.Name -eq "components") {
        Get-ChildItem -Path $_.FullName -File | ForEach-Object {
            Write-Host "    $($_.Name)" -ForegroundColor Gray
        }
    }
}

# Show main files
Write-Host "`nMain files:" -ForegroundColor Cyan
Get-ChildItem -Path . -File -Filter "*.html" | ForEach-Object {
    Write-Host "  $($_.Name)" -ForegroundColor White
}
Get-ChildItem -Path . -File -Filter "*.md" | ForEach-Object {
    Write-Host "  $($_.Name)" -ForegroundColor White
}

Write-Host "`nCleanup completed successfully!" -ForegroundColor Green
Write-Host "Original files have been backed up to: $backupDir" -ForegroundColor Yellow

# Display recommendations
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Copy your images to assets/images/" -ForegroundColor White
Write-Host "2. Update image paths in HTML files if needed" -ForegroundColor White
Write-Host "3. Test the website using a local server" -ForegroundColor White
Write-Host "4. Review and customize the components as needed" -ForegroundColor White