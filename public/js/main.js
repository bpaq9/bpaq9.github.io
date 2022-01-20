// Fetch accessibility issues
const testAccessibility = async (e) => {
  e.preventDefault()

  const url = document.querySelector('#url').value

  if (url === '') {
    alert('Please add a url')
  } else {
    setLoading()

    const response = await fetch(`/api/test?url=${url}`)

    if (response.status !== 200) {
      setLoading(false)
      alert('Something went wrong :(')
    } else {
      const { issues } = await response.json()
      addIssuesToDOM(issues)
      setLoading(false)
    }
  }
}
// Add issues to DOM
const addIssuesToDOM = (issues) => {
  const issuesOutput = document.querySelector('#issues')

  issuesOutput.innerHTML = ''

  if (issues.length === 0) {
    issuesOutput.innerHTML = '<h4>No Issues Found</h4>'
  } else {
    issues.forEach((issue) => {
      const output = `
        <div class="card">
            <h4>${issue.message}</h4>
            <p class="my-3 p-3">
              ${escapeHTML(issue.context)}
            </p>
            <p class="p-2">
              CODE: ${issue.code}
            </p>
        </div>
      `

      issuesOutput.innerHTML += output
    })
  }
}

// Set loading state
const setLoading = (isLoading = true) => {
  const loader = document.querySelector('.loader')
  if (isLoading) {
    loader.style.visibility = 'visible'
  } else {
    loader.style.visibility = 'hidden'
  }
}

// Escape HTML
function escapeHTML(html) {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

document.querySelector('#form').addEventListener('submit', testAccessibility)