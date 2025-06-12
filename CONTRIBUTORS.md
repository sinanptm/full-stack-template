# Contributors Guide 🤝

Thank you for your interest in contributing to the Full-Stack Authentication Template! This document provides guidelines to help you contribute effectively.

## 📋 Before You Start

### Prerequisites
- Node.js v22+
- pnpm v10.8.1+
- Basic understanding of Next.js, Express.js, and MongoDB
- Familiarity with TypeScript

### Project Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/sinanptm/fullstack-clean-auth-template`
3. Install dependencies: `pnpm install`
4. Set up environment variables (see README.md or .env examples)
5. Start development: `pnpm dev`

## 🎯 Contribution Guidelines

### Code Standards
- **Always format your code** before submitting a PR: `pnpm format`
- Follow existing code patterns and architecture
- Use TypeScript with proper type definitions
- Write clear, descriptive commit messages
- Keep functions small and focused

### Pull Request Rules
1. **Format First**: Run `pnpm format` before creating your PR
2. **Test Your Changes**: Ensure all existing tests pass with `pnpm test`
3. **Clean Commits**: Use meaningful commit messages
4. **Small PRs**: Keep changes focused and atomic

### Architecture Guidelines
- Follow the Clean Architecture pattern
- Keep business logic separate from frameworks
- Use dependency injection where appropriate
- Maintain separation between frontend and backend concerns

## 🔧 Development Workflow

### Making Changes
```bash
# 1. Create a feature branch
git checkout -b feature/your-feature-name

# 2. Make your changes
# ... code changes ...

# 3. Format your code (REQUIRED)
pnpm format

# 4. Test your changes
pnpm test

# 5. Commit with clear message
git commit -m "feat: add user profile picture upload"

# 6. Push to your fork
git push origin feature/your-feature-name

# 7. Create Pull Request
```

### Commit Message Format
```
type: brief description

Examples:
feat: add OAuth2 GitHub integration
fix: resolve JWT token expiration issue
docs: update API documentation
refactor: improve user service structure
test: add unit tests for auth middleware
```

## 🎨 What We're Looking For

### High Priority Contributions
- Bug fixes and security improvements
- Performance optimizations
- Additional OAuth providers
- Enhanced error handling
- Documentation improvements
- Test coverage improvements

### Feature Ideas
- Two-factor authentication
- Email templates customization
- Additional database support (PostgreSQL, etc.)
- Docker containerization
- CI/CD pipeline improvements
- Rate limiting enhancements

### Code Quality
- Clean, readable code
- Proper error handling
- Input validation
- Security best practices
- Performance considerations

## 🚫 What to Avoid

- Breaking changes without discussion
- Unnecessary dependencies
- Overly complex solutions
- Code without proper formatting
- PRs without descriptions
- Unrelated changes in single PR

## 📝 Pull Request Template

When creating a PR, please include:

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Testing
- [ ] Ran `pnpm format` before submitting
- [ ] All tests pass (`pnpm test`)
- [ ] Tested manually in development
- [ ] No breaking changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Additional Notes
Any additional context or considerations
```

## 🎉 Recognition

All contributors will be:
- Added to the contributors list
- Credited in release notes
- Mentioned in project documentation

## 💬 Getting Help

- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Security**: Email security issues privately (check README for contact)

## 📄 Code of Conduct

- Be respectful and professional
- Provide constructive feedback
- Help others learn and grow
- Focus on the code, not the person
- Celebrate successes together

---

**Remember**: Before submitting any PR, always run `pnpm format` to ensure consistent code style!

Thank you for contributing to making this template better for everyone! 🚀