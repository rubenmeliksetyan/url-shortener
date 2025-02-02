import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Url } from './url.entity';
import { User } from '../user/user.entity';
import { VisitService } from '../visit/visit.service';
import { ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';

describe('UrlService', () => {
    let urlService: UrlService;
    let urlRepository: Repository<Url>;
    let userRepository: Repository<User>;
    let visitService: VisitService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UrlService,
                {
                    provide: getRepositoryToken(Url),
                    useValue: {
                        find: jest.fn(),
                        findOne: jest.fn(),
                        create: jest.fn(), // ✅ Mock `create()`
                        save: jest.fn(), // ✅ Mock `save()`
                        update: jest.fn(),
                        delete: jest.fn(),
                    },
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        findOne: jest.fn(),
                    },
                },
                {
                    provide: VisitService,
                    useValue: {},
                },
            ],
        }).compile();

        urlService = module.get<UrlService>(UrlService);
        urlRepository = module.get<Repository<Url>>(getRepositoryToken(Url));
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
        visitService = module.get<VisitService>(VisitService);
    });

    // ✅ Test: `createUrl()`
    it('should create a new URL with a unique slug', async () => {
        const createUrlDto = { originalUrl: 'http://example.com', userId: 1, slug: 'test' };
        const expectedSavedUrl = {
            originalUrl: createUrlDto.originalUrl,
            slug: createUrlDto.slug,
            user: { id: createUrlDto.userId },
        };

        jest.spyOn(urlRepository, 'findOne').mockResolvedValue(null); // ✅ Ensure slug is unique
        jest.spyOn(urlRepository, 'create').mockReturnValue(expectedSavedUrl as any); // ✅ Mock `create()`
        jest.spyOn(urlRepository, 'save').mockResolvedValue(expectedSavedUrl as any); // ✅ Mock `save()`

        const result = await urlService.createUrl(createUrlDto);

        expect(result).toEqual(expectedSavedUrl);
        expect(urlRepository.create).toHaveBeenCalledWith(expect.objectContaining(expectedSavedUrl));
        expect(urlRepository.save).toHaveBeenCalled();
    });

    // ✅ Test: `updateSlug()`
    it('should update a slug for an existing URL', async () => {
        const mockUrl: Url = {
            id: 1,
            slug: 'oldSlug',
            originalUrl: 'http://example.com',
            user: { id: 1 } as User,
            visits: [],
            createdAt: new Date(),
        };


        jest.spyOn(urlRepository, 'findOne')
            .mockResolvedValueOnce(mockUrl as any) // ✅ First call finds existing URL
            .mockResolvedValueOnce(null); // ✅ Second call confirms new slug is available

        jest.spyOn(urlRepository, 'save').mockResolvedValue({ ...mockUrl, slug: 'newSlug' });

        const result = await urlService.updateSlug('oldSlug', 'newSlug', 1);
        expect(result.slug).toBe('newSlug');
        expect(urlRepository.save).toHaveBeenCalled();
    });

    it('should throw ForbiddenException if new slug is already in use', async () => {
        const mockUrl = { id: 1, slug: 'oldSlug', originalUrl: 'http://example.com', user: { id: 1 } };

        jest.spyOn(urlRepository, 'findOne')
            .mockResolvedValueOnce(mockUrl as any) // ✅ Finds existing URL
            .mockResolvedValueOnce({ slug: 'newSlug' } as any); // ❌ Finds duplicate slug

        await expect(urlService.updateSlug('oldSlug', 'newSlug', 1)).rejects.toThrow(ForbiddenException);
    });
});