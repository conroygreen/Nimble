# Contributing to Nimble

Thank you for your interest in contributing to Nimble! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards others

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`
5. Make your changes
6. Test your changes thoroughly
7. Commit with conventional commit messages
8. Push to your fork
9. Open a Pull Request

## Development Setup

See [SETUP.md](./docs/SETUP.md) for detailed instructions on setting up your development environment.

## Project Structure

```
/apps
  /web       - Next.js frontend
  /api       - NestJS backend
  /worker    - BullMQ workers
/packages
  /core      - Shared types
  /utils     - Utilities
  /ui        - UI components
/prisma      - Database schema
/docs        - Documentation
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Provide type annotations for function parameters and return types
- Avoid `any` types when possible

### Code Style

We use ESLint and Prettier for code formatting:

```bash
npm run lint
```

### Naming Conventions

- **Files**: kebab-case (e.g., `user-service.ts`)
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Functions/Variables**: camelCase (e.g., `getUserById`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_ATTEMPTS`)
- **Interfaces/Types**: PascalCase (e.g., `UserProfile`)

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(products): add quantity break pricing
fix(orders): resolve status update race condition
docs(api): update authentication examples
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests for specific app
cd apps/api && npm test
```

### Writing Tests

- Write unit tests for business logic
- Write integration tests for API endpoints
- Test tenant isolation
- Test payment flows
- Mock external services (Stripe, S3, etc.)

### Test Structure

```typescript
describe('ProductsService', () => {
  describe('calculatePrice', () => {
    it('should apply quantity breaks correctly', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

## Database Changes

When making schema changes:

1. Update `prisma/schema.prisma`
2. Generate migration: `npm run db:migrate`
3. Update seed data if needed
4. Update TypeScript types in `@nimble/core`
5. Document breaking changes

## API Changes

When adding or modifying API endpoints:

1. Update DTOs with validation
2. Add Swagger decorators for documentation
3. Test tenant isolation
4. Update `docs/API.md`
5. Consider backward compatibility

## UI Changes

For frontend changes:

1. Follow existing component patterns
2. Use Tailwind CSS for styling
3. Ensure responsive design
4. Test across browsers
5. Add loading and error states

## Pull Request Process

1. **Update Documentation**: Update relevant docs for your changes
2. **Add Tests**: Include tests for new functionality
3. **Run Linter**: Ensure code passes linting
4. **Update Changelog**: Add entry to CHANGELOG.md (if exists)
5. **Request Review**: Tag appropriate reviewers
6. **Address Feedback**: Make requested changes
7. **Squash Commits**: Clean up commit history before merge

## Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests pass locally
```

## Areas for Contribution

### High Priority

- Integration tests for tenant isolation
- E2E tests for order workflow
- Preflight check implementation with Ghostscript
- Email templates and notification system
- Mobile responsive improvements

### Medium Priority

- Additional UI components
- Performance optimizations
- Accessibility improvements
- Error handling enhancements
- Logging improvements

### Documentation

- Video tutorials
- API examples
- Architecture diagrams
- Deployment guides for different platforms

## Getting Help

- Open an issue for bugs or feature requests
- Start a discussion for questions
- Check existing issues before creating new ones
- Provide minimal reproduction examples

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to Nimble! 🎉
