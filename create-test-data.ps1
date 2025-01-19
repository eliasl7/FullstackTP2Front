# create-test-data.ps1

$baseUrl = "http://localhost:8080"
$artists = @(
    "Metallica",
    "Iron Maiden",
    "AC/DC",
    "Rammstein",
    "Tool",
    "System of a Down",
    "Slipknot",
    "Gojira",
    "Mastodon",
    "Dream Theater",
    "Train Fantome"
)

$events = @(
    @{
        label = "Hellfest 2025"
        startDate = "2025-06-20"
        endDate = "2025-06-23"
    },
    @{
        label = "Download Festival 2025"
        startDate = "2025-07-15"
        endDate = "2025-07-17"
    },
    @{
        label = "Wacken Open Air 2025"
        startDate = "2025-08-01"
        endDate = "2025-08-04"
    },
    @{
        label = "Rock en Seine 2025"
        startDate = "2025-08-23"
        endDate = "2025-08-25"
    },
    @{
        label = "Motocultor 2025"
        startDate = "2025-08-15"
        endDate = "2025-08-18"
    }
)

# Création des artistes
$artistIds = @()
foreach ($artistName in $artists) {
    $body = @{
        label = $artistName
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$baseUrl/artists" -Method Post -Body $body -ContentType "application/json"
    $artistIds += $response.id
    Write-Host "Created artist: $artistName"
}

# Création des événements
$eventIds = @()
foreach ($event in $events) {
    $body = $event | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$baseUrl/events" -Method Post -Body $body -ContentType "application/json"
    $eventIds += $response.id
    Write-Host "Created event: $($event.label)"
}

# Association aléatoire des artistes aux événements
foreach ($eventId in $eventIds) {
    # Sélectionner 3-5 artistes aléatoires pour chaque événement
    $numArtists = Get-Random -Minimum 3 -Maximum 6
    $selectedArtists = Get-Random -InputObject $artistIds -Count $numArtists

    foreach ($artistId in $selectedArtists) {
        try {
            Invoke-RestMethod -Uri "$baseUrl/events/$eventId/artists/$artistId" -Method Post
            Write-Host "Linked artist to event: $eventId - $artistId"
        }
        catch {
            Write-Host "Failed to link artist to event: $eventId - $artistId"
        }
    }
}

Write-Host "Test data creation completed!"